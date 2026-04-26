import {
  createPaystackCustomer,
  createDedicatedAccount,
  verifyWebhookSignature,
} from "../services/paystack.js";
import { z } from "zod";
import { prisma } from "../utils/db.js";

const createOrderSchema = z.object({
  customerName: z
    .string()
    .min(3, "Name must be at least 2 words")
    .regex(
      /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
      "Enter a valid full name (e.g. John Doe)",
    ),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
  state: z.string().min(2),
});

// ── CREATE ORDER + GENERATE VIRTUAL ACCOUNT ────────────────

export const orderData = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    // 🔒 Always fetch product from DB
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 💡 Apply same bundle logic on backend
    let total = product.price * qty;

    if (qty === 3) total -= 1500;
    if (qty === 5) total -= 5000;

    const order = await prisma.order.create({
      data: {
        productId,
        qty,
        price: product.price,
        total,
      },
    });

    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderDataById = async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const product = await prisma.product.findUnique({
    where: { id: order.productId },
  });

  // 3. Merge response
  res.json({
    ...order,
    product, // attach manually
  });
};

export const initializeTransfer = async (req, res) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { customerName, email, phone, address, state } = parsed.data;

    // 1. Generate order number
    const orderNumber = `TC-${Date.now().toString().slice(-6)}`;

    // 2. Create Paystack customer
    const nameParts = customerName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || firstName;

    const paystackCustomer = await createPaystackCustomer(
      email,
      firstName,
      lastName,
      phone,
    );

    // 3. Create dedicated virtual account
    const dedicatedAccount = await createDedicatedAccount(
      paystackCustomer.customer_code,
    );

    // 4. Save order to DB
    const orderDetails = await prisma.payment_Info.create({
      data: {
        orderNumber,
        customerName,
        email,
        phone,
        address,
        state,
        orderDetails: order,
        total: order.total,
        status: "pending",
        paymentStatus: "unpaid",
        paystackCustomerCode: paystackCustomer.customer_code,
        dedicatedAccountNo: dedicatedAccount.account_number,
        dedicatedBankName: dedicatedAccount.bank.name,
        dedicatedAccountName: dedicatedAccount.account_name,
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      payment_info: {
        id: orderDetails.id,
        name: orderDetails.customerName,
        email: orderDetails.email,
        phone: orderDetails.phone,
        address: orderDetails.address,
        state: orderDetails.state,
        orderDetails: orderDetails.orderDetails,
        orderNumber: orderDetails.orderNumber,
        total: orderDetails.total,
        bankName: orderDetails.dedicatedBankName,
        accountNumber: orderDetails.dedicatedAccountNo,
        accountName: orderDetails.dedicatedAccountName,
        amount: orderDetails.total,
        note: `Transfer exactly ₦${orderDetails.total} to complete your order`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── GET ORDER STATUS (for track order page) ────────────────
export const getOrderByPhone = async (req, res) => {
  try {
    const { phone, orderNumber } = req.query;

    if (!phone && !orderNumber) {
      return res.status(400).json({ error: "Provide phone or order number" });
    }

    const order = await prisma.order.findFirst({
      where: {
        OR: [phone ? { phone } : {}, orderNumber ? { orderNumber } : {}],
      },
      select: {
        orderNumber: true,
        customerName: true,
        status: true,
        paymentStatus: true,
        total: true,
        items: true,
        createdAt: true,
        // never expose bank details or internal IDs in track endpoint
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ── PAYSTACK WEBHOOK ───────────────────────────────────────
export const paystackWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];

    // verify the webhook is actually from Paystack
    const isValid = verifyWebhookSignature(JSON.stringify(req.body), signature);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    const event = req.body;

    if (event.event === "charge.success") {
      const { customer, amount, reference } = event.data;

      // find order by Paystack customer code
      const order = await prisma.payment_Info.findFirst({
        where: { paystackCustomerCode: customer.customer_code },
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // verify amount matches (Paystack sends in kobo)
      const paidAmount = amount / 100;
      if (paidAmount < order.total) {
        // underpayment — flag it
        await prisma.payment_Info.update({
          where: { id: order.id },
          data: { paymentStatus: "underpaid", paystackReference: reference },
        });
        return res.sendStatus(200);
      }

      // mark as paid
      await prisma.payment_Info.update({
        where: { id: order.id },
        data: {
          paymentStatus: "paid",
          status: "processing",
          paystackReference: reference,
        },
      });
    }

    res.sendStatus(200); // always return 200 to Paystack
  } catch (error) {
    console.error(error);
    res.sendStatus(200); // still return 200 — don't let Paystack retry endlessly
  }
};

// ── GET ALL ORDERS (admin) ─────────────────────────────────
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ── UPDATE ORDER STATUS (admin) ────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "failed",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
