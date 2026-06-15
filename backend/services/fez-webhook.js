import axios from "axios";
import { FEZ_BASE, loginToFez } from "./fez.js";

export const registerFezWebhook = async () => {
  let fezData = await loginToFez();
  try {
    const response = await axios.post(
      `${FEZ_BASE}/webhooks/store`,
      {
        webhook: "https://toocleancare.com/api/order/fez/webhook",
      },
      {
        headers: {
          Authorization: `Bearer ${fezData.token}`,
          "secret-key": fezData.secretKey,
        },
      },
    );
    console.log("✅ Webhook registered");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("❌ Fez delivery failed:");
    console.error("Status:", error);
    console.error("Data:", error.response?.data);
  }
};

(async () => {
  await registerFezWebhook();
})();
