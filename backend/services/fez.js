import axios from "axios";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../utils/db.js";

// dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
// services/fezAuth.ts

export const FEZ_BASE = "https://api.fezdelivery.co/v1";

// const FEZ_BASE = "https://apisandbox.fezdelivery.co/v1";

let fezToken = null;
let fezSecretKey = null;
let tokenExpiry = 0;
// const fezUserId = process.env.FEZ_USER_ID;
// const fezPasswd = process.env.FEZ_PASSWORD;

export const loginToFez = async () => {
  try {
    console.log("🔐 Starting Fez login...");
    // console.log(fezUserId, fezPasswd);
    const payload = {
      user_id: process.env.FEZ_USER_ID,
      password: process.env.FEZ_PASSWORD,
    };

    const res = await axios.post(`${FEZ_BASE}/user/authenticate`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Full Fez response:");
    console.log(JSON.stringify(res.data, null, 2));

    const token = res.data?.authDetails?.authToken;

    // ✅ IMPORTANT FIX
    const secretKey = res.data?.orgDetails?.["secret-key"];

    const expiresAt = res.data?.authDetails?.expireToken;

    if (!token) {
      throw new Error("Fez login failed: no token returned");
    }

    if (!secretKey) {
      throw new Error("Fez login failed: no secret key returned");
    }

    fezToken = token;
    fezSecretKey = secretKey;

    tokenExpiry = new Date(expiresAt).getTime();

    console.log("✅ Token stored");
    console.log("✅ Secret key stored");
    console.log("⏰ Expires:", expiresAt);

    return {
      token: fezToken,
      secretKey: fezSecretKey,
    };
  } catch (error) {
    console.error("❌ FEZ LOGIN ERROR");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);

    throw error;
  }
};

export const getFezAuth = async (forceRefresh = false) => {
  if (!forceRefresh && fezToken && fezSecretKey && Date.now() < tokenExpiry) {
    console.log("♻️ Using cached Fez auth");
    return {
      token: fezToken,
      secretKey: fezSecretKey,
    };
  }
  console.log("🔄 Fetching new Fez auth...");
  return await loginToFez();
};

export const triggerFezDelivery = async (order) => {
  if (order.deliveryStatus && order.deliveryStatus !== "not_created") {
    console.log("⚠️ Delivery already handled, skipping");
    return;
  }

  console.log("📦 triggerFezDelivery called:", order.id);
  // ✅ MOVE PAYLOAD HERE
  const payload = [
    {
      BatchID: `BATCH-${Date.now()}`,
      uniqueID: order.id,
      recipientName: order.customerName,
      recipientPhone: order.phone,
      recipientAddress: order.address,
      recipientState: order.state,
      weight: 1,
      valueOfItem: `${order.total}`,
    },
  ];

  try {
    // console.log("📡 Sending Fez payload:", payload);

    const response = await axios.post(`${FEZ_BASE}/order`, payload, {
      headers: {
        Authorization: `Bearer ${fezToken}`,
        "secret-key": fezSecretKey,
      },
    });
    const fezOrderNumber = response.data?.orderNos?.[order.id] ?? null;

    await prisma.payment_Info.update({
      where: { id: order.id },
      data: {
        deliveryStatus: "created",
        fezOrderNumber,
      },
    });

    console.log("🚚 Fez delivery created:", response.data);
  } catch (error) {
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    if (error.response?.status === 401) {
      console.log("🔄 Token expired, retrying...");

      try {
        const { token, secretKey } = await getFezAuth(true);

        // console.log(`HERE IS YOR AUTH:${token}, SECRET:${secretKey}`);

        const retryResponse = await axios.post(`${FEZ_BASE}/order`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "secret-key": secretKey, // ✅ FIXED
          },
        });

        const fezOrderNumber = retryResponse.data?.orderNos?.[order.id] ?? null;
        await prisma.payment_Info.update({
          where: { id: order.id },
          data: {
            deliveryStatus: "created",
            fezOrderNumber,
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

export const fezOrder = async (orderId) => {
  try {
    const response = await axios.get(`${FEZ_BASE}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${fezToken}`,
        "secret-key": fezSecretKey,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("🔄 Token expired, retrying...");

      try {
        const { token, secretKey } = await getFezAuth(true);

        // console.log(`HERE IS YOR AUTH:${token}, SECRET:${secretKey}`);

        const retryResponse = await axios.get(`${FEZ_BASE}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "secret-key": secretKey, // ✅ FIXED
          },
        });
        return retryResponse.data;
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
export const fezTrackOrder = async (orderNumber) => {
  try {
    const response = await axios.get(`${FEZ_BASE}/order/track/${orderNumber}`, {
      headers: {
        Authorization: `Bearer ${fezToken}`,
        "secret-key": fezSecretKey,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
