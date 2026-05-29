import axios from "axios";
import crypto from "crypto";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const CALL_BACK_URL = process.env.CALL_BACK_URL;

export const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
    "Content-Type": "application/json",
  },
});

// ── 1. Create or fetch a Paystack customer ─────────────────
export const createPaystackCustomer = async (
  email,
  firstName,
  lastName,
  phone,
) => {
  const { data } = await paystack.post("/customer", {
    email,
    first_name: firstName,
    last_name: lastName,
    phone,
  });
  return data.data; // returns customer object with customer_code
};

// ── 2. Create dedicated virtual account for customer ───────
export const createDedicatedAccount = async (
  customerCode,
  preferredBank = "wema-bank", // wema-bank or titan-paystack
) => {
  try {
    const { data } = await paystack.post("/dedicated_account", {
      customer: customerCode,
      preferred_bank: preferredBank,
    });
    return data.data; // returns account number, bank name etc
  } catch (error) {
    console.log(error);
  }
};

export const initializeTransaction = async (email, amount) => {
  try {
    const { data } = await paystack.post("/transaction/initialize", {
      email,
      amount: amount * 100,

      currency: "NGN",

      channels: ["bank_transfer"],

      callback_url: `${CALL_BACK_URL}/payment/success`,
    });

    return data.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

// ── 3. Fetch existing dedicated account ────────────────────
export const getDedicatedAccount = async (accountId) => {
  const { data } = await paystack.get(`/dedicated_account/${accountId}`);
  return data.data;
};

// ── 4. Verify webhook signature ────────────────────────────

export const verifyWebhookSignature = (payload, signature) => {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(payload)
    .digest("hex");
  return hash === signature;
};
