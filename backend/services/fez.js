import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// services/fezAuth.ts

const FEZ_BASE = "https://api.fezdelivery.co/";

let fezToken = null;
let tokenExpiry = 0;

export const loginToFez = async () => {
  try {
    console.log("🔐 Starting Fez login...");

    // console.log("📧 USER ID:", process.env.FEZ_USER_ID);
    // console.log("🔑 PASSWORD EXISTS:", !!process.env.FEZ_PASSWORD);

    const payload = JSON.stringify({
      user_id: process.env.FEZ_USER_ID,
      password: process.env.FEZ_PASSWORD,
    });
    console.log("📡 Sending payload:", payload);

    const res = await axios.post(`${FEZ_BASE}/user/authenticate`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.config.data);

    console.log("✅ Full Fez response:");
    console.log(JSON.stringify(res.data, null, 2));

    const token = res.data?.authDetails?.authToken;

    const expiresAt = res.data?.authDetails?.expireToken;

    if (!token) {
      console.log("❌ No token returned");

      throw new Error("Fez login failed: no token returned");
    }

    fezToken = token;

    tokenExpiry = new Date(expiresAt).getTime();

    console.log("✅ Token stored");
    console.log("⏰ Expires:", expiresAt);

    return fezToken;
  } catch (error) {
    console.error("❌ FEZ LOGIN ERROR");

    console.error("Status:", error.response?.status);

    console.error("Response:", error.response?.data);

    console.error("Message:", error.message);

    throw error;
  }
};

export const getFezToken = async () => {
  if (fezToken && Date.now() < tokenExpiry) {
    console.log("♻️ Using cached Fez token");

    return fezToken;
  }

  console.log("🔄 Fetching new Fez token...");

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
    console.log(token);
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
