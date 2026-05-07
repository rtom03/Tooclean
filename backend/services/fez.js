import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// services/fezAuth.ts

let fezAuth = {
  token: null,
  secretKey: null,
  expiresAt: 0,
};

const FEZ_BASE = "https://apisandbox.fezdelivery.co/v1";

export const loginToFez = async () => {
  const res = await axios.post(`${FEZ_BASE}/user/authenticate`, {
    user_id: process.env.FEZ_USER_ID,
    password: process.env.FEZ_PASSWORD,
  });

  const token = res.data?.authDetails?.authToken;

  const secretKey = res.data?.orgDetails?.["secret-key"];

  const expiresAt = res.data?.authDetails?.expireToken;

  if (!token || !secretKey) {
    throw new Error("Fez login failed");
  }

  fezAuth = {
    token,
    secretKey,
    expiresAt: new Date(expiresAt).getTime(),
  };

  console.log("🔐 Fez token refreshed");

  return fezAuth.token;
};

export const getFezAuth = async () => {
  // token still valid
  if (fezAuth.token && Date.now() < fezAuth.expiresAt) {
    return fezAuth.token;
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
    const token = await getFezToken();

    // 🔑 Required Fez fields
    const payload = {
      BatchID: `BATCH-${Date.now()}`, // or reuse per batch
      uniqueID: order.id, // MUST be unique per delivery
      recipientName: order.customerName,
      recipientPhone: order.phone,
      recipientAddress: order.address,
      recipientState: order.state,
      weight: 1, // adjust if you calculate weight
      valueOfItem: `${order.total}`, // string as required
    };

    console.log("📡 Sending Fez payload:", payload);

    const response = await axios.post(`${FEZ_BASE}/order`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // 🔑 login token
        "api-token": process.env.FEZ_API_TOKEN, // 🔑 required
      },
    });

    console.log("🚚 Fez delivery created:", response.data);

    await prisma.payment_Info.update({
      where: { id: order.id },
      data: {
        deliveryStatus: "created",
        fezTrackingId: response.data.data?.orderId || null,
      },
    });

    console.log("✅ Delivery saved to DB");
  } catch (error) {
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);

    // 🔁 retry once if token expired
    if (error.response?.status === 401) {
      console.log("🔄 Token expired, retrying...");

      try {
        const newToken = await getFezToken(); // will refresh

        const retryResponse = await axios.post(`${FEZ_BASE}/order`, payload, {
          headers: {
            Authorization: `Bearer ${newToken}`,
            "api-token": process.env.FEZ_API_TOKEN,
          },
        });

        console.log("🚚 Fez delivery created (retry):", retryResponse.data);
      } catch (retryError) {
        console.error(
          "❌ Retry failed:",
          retryError.response?.data || retryError.message,
        );
      }
    }
  }
};
