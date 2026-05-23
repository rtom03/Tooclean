import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// services/fezAuth.ts

const FEZ_BASE = "https://apisandbox.fezdelivery.co/v1";
//  "https://api.fezdelivery.co/";

let fezToken = null;
let fezSecretKey = null;
let tokenExpiry = 0;

export const loginToFez = async () => {
  try {
    console.log("🔐 Starting Fez login...");

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

  console.log(
    "🔑 Secret key present?",
    !!fezSecretKey,
    fezSecretKey?.slice(0, 6),
  );

  try {
    console.log("📡 Sending Fez payload:", payload);

    const response = await axios.post(`${FEZ_BASE}/order`, payload, {
      headers: {
        secret_key: fezSecretKey,
      },
    });
    // Authorization: `Bearer ${fezToken}`,

    console.log("🚚 Fez delivery created:", response.data);
  } catch (error) {
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    // if (error.response?.status === 401) {
    //   console.log("🔄 Token expired, retrying...");

    //   try {
    //     const { token, secretKey } = await getFezAuth(true);

    //     const retryResponse = await axios.post(`${FEZ_BASE}/order`, payload, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         secret_key: secretKey, // ✅ FIXED
    //       },
    //     });

    //     console.log("🚚 Fez delivery created (retry):", retryResponse.data);
    //   } catch (retryError) {
    //     console.error(
    //       "❌ Retry failed:",
    //       retryError.response?.data || retryError.message,
    //     );
    //   }
    // }
  }
};
