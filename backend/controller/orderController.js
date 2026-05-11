import {
  createPaystackCustomer,
  createDedicatedAccount,
  verifyWebhookSignature,
} from "../services/paystack.js";
import { z } from "zod";
import { prisma } from "../utils/db.js";
import { triggerFezDelivery } from "../services/fez.js";

const DELIVERY_RATES = [
  { state: "Lagos", price: 2700 },

  { state: "Ekiti", price: 4569 },
  { state: "Ondo", price: 4569 },
  { state: "Oyo", price: 4569 },
  { state: "Ogun", price: 4569 },
  { state: "Osun", price: 4569 },

  { state: "Akwa Ibom", price: 6719 },
  { state: "Cross River", price: 5644 },
  { state: "Rivers", price: 5644 },
  { state: "Delta", price: 5644 },
  { state: "Edo", price: 5644 },
  { state: "Bayelsa", price: 5644 },

  { state: "Niger", price: 6450 },
  { state: "Benue", price: 6450 },
  { state: "Plateau", price: 6450 },
  { state: "Kogi", price: 6450 },
  { state: "FCT", price: 6181 },
  { state: "Kwara", price: 5644 },
  { state: "Nasarawa", price: 6450 },

  { state: "Enugu", price: 5644 },
  { state: "Anambra", price: 5644 },
  { state: "Imo", price: 5644 },
  { state: "Abia", price: 5644 },
  { state: "Ebonyi", price: 5644 },

  { state: "Jigawa", price: 6450 },
  { state: "Kano", price: 6450 },
  { state: "Kaduna", price: 6450 },
  { state: "Zamfara", price: 6450 },
  { state: "Sokoto", price: 6450 },
  { state: "Kebbi", price: 6450 },
  { state: "Katsina", price: 6450 },

  { state: "Gombe", price: 6450 },
  { state: "Bauchi", price: 6450 },
  { state: "Borno", price: 6450 },
  { state: "Adamawa", price: 6450 },
  { state: "Taraba", price: 6450 },
  { state: "Yobe", price: 6450 },
];

const DELIVERY_RATE_MAP = Object.fromEntries(
  DELIVERY_RATES.map((item) => [item.state, item.price]),
);
// ── CREATE ORDER + GENERATE VIRTUAL ACCOUNT ────────────────

// export const orderData = async (req, res) => {
//   const { productId, qty } = req.body;

//   try {
//     // 🔒 Always fetch product from DB
//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // 💡 Apply same bundle logic on backend
//     let total = product.price * qty;

//     if (qty === 3) total -= 1500;
//     if (qty === 5) total -= 5000;

//     const order = await prisma.order.create({
//       data: {
//         productId,
//         qty,
//         price: product.price,
//         total,
//       },
//     });

//     res.json({ orderId: order.id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const orderData = async (req, res) => {
  const { items } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "No items provided",
      });
    }

    let orderTotal = 0;

    // Build order items
    const orderItemsData = [];

    for (const item of items) {
      const { productId, qty } = item;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${productId}`,
        });
      }

      // Bundle logic
      let subtotal = product.price * qty;

      // if (qty > 1) subtotal -= 500;
      // if (qty === 3) subtotal -= 1500;
      // if (qty === 5 || qty > 5) subtotal -= 5000;

      orderTotal += subtotal;

      orderItemsData.push({
        productId,
        qty,
        price: product.price,
        subtotal,
      });
    }

    // Create order + items
    const order = await prisma.order.create({
      data: {
        total: orderTotal,

        items: {
          create: orderItemsData,
        },
      },

      include: {
        items: true,
      },
    });

    console.log(order);

    res.json({
      orderId: order.id,
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};
export const getOrderDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const initializeTransfer = async (req, res) => {
  try {
    const parsed = req.body;
    console.log(parsed);
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!parsed) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const { customerName, email, phone, address, state, deliveryPrice } =
      parsed;

    const stateDeliveryPrice = DELIVERY_RATE_MAP[state];
    // console.log(stateDeliveryPrice);

    if (!stateDeliveryPrice) {
      return res.status(400).json({ error: "Invalid state" });
    }
    const totalAmount = order.total + stateDeliveryPrice;
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
        deliveryPrice,
        orderDetails: order,
        total: totalAmount,
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
        deliveryPrice: orderDetails.deliveryPrice,
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

    const order = await prisma.payment_Info.findFirst({
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
  console.log("🔥 Webhook hit!");

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
        where: {
          paystackCustomerCode: customer.customer_code,
          paymentStatus: "unpaid",
        },
        orderBy: { createdAt: "desc" }, // ✅ latest order wins
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
      const updatedOrder = await prisma.payment_Info.update({
        where: { id: order.id },
        data: {
          paymentStatus: "paid",
          status: "processing",
          paystackReference: reference,
        },
      });

      if (updatedOrder.paymentStatus === "paid") {
        console.log("🚀 About to trigger Fez for order:", updatedOrder.id);
        await triggerFezDelivery(updatedOrder);
      }
    }

    console.log("Event type:", event.event);

    res.sendStatus(200); // always return 200 to Paystack
  } catch (error) {
    console.error(error);
    res.sendStatus(200); // still return 200 — don't let Paystack retry endlessly
  }
};

// ── GET ALL ORDERS (admin) ─────────────────────────────────
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.payment_Info.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.query;

  try {
    const order = await prisma.payment_Info.findUnique({
      where: { id: String(id) },
    });

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ── UPDATE ORDER STATUS (admin) ────────────────────────────
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.query;
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

    const order = await prisma.payment_Info.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
