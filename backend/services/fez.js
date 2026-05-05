import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// services/fezAuth.ts

let fezToken = null;
let tokenExpiry = 0; // timestamp in ms

const FEZ_BASE = "https://apisandbox.fezdelivery.co/v1";

export const loginToFez = async () => {
  const res = await axios.post(`${FEZ_BASE}/auth/login`, {
    email: process.env.FEZ_EMAIL,
    password: process.env.FEZ_PASSWORD,
  });

  // ⚠️ Adjust depending on actual response shape
  const token = res.data?.token || res.data?.data?.token;

  if (!token) {
    throw new Error("Fez login failed: no token returned");
  }

  // Fez said ~3 hours → set slightly less to be safe
  const expiresInMs = 2.5 * 60 * 60 * 1000;

  fezToken = token;
  tokenExpiry = Date.now() + expiresInMs;

  console.log("🔐 Fez token refreshed");

  return fezToken;
};

export const getFezToken = async () => {
  // reuse token if still valid
  if (fezToken && Date.now() < tokenExpiry) {
    return fezToken;
  }

  return await loginToFez();
};

export const triggerFezDelivery = async (order) => {
  if (order.deliveryStatus && order.deliveryStatus !== "not_created") {
    console.log("⚠️ Delivery already handled, skipping");
    return;
  }
  console.log("📦 triggerFezDelivery called:", order.id);
  try {
    const payload = {
      recipientName: order.customerName,
      recipientEmail: order.email,
      recipientPhone: order.phone,
      recipientAddress: order.address,
      recipientState: order.state,
      orderNo: order.orderNumber,
    };

    const response = await axios.post(
      "https://apisandbox.fezdelivery.co/v1/order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FEZ_TOKEN}`,
        },
      },
    );

    console.log("🚚 Fez delivery created:", response.data);

    // optionally store tracking info
    await prisma.payment_Info.update({
      where: { id: order.id },
      data: {
        deliveryStatus: "created",
        fezTrackingId: response.data.data?.orderId,
      },
    });
  } catch (error) {
    console.error(
      "❌ Fez delivery failed:",
      error.response?.data || error.message,
    );
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
  }
};
