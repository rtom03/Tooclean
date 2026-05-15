import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InitializePaymentResponse } from "../constant/index.type";

interface PaymentStore {
  paymentData: InitializePaymentResponse | null;
  storedAt: number | null;

  setPaymentData: (data: InitializePaymentResponse | null) => void;
  clearPaymentData: () => void;
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      paymentData: null,

      storedAt: null,

      setPaymentData: (data) =>
        set({ paymentData: data, storedAt: Date.now() }),

      clearPaymentData: () =>
        set({
          paymentData: null,

          // ✅ clear this too
          storedAt: null,
        }),
    }),
    {
      name: "payment-storage",
    },
  ),
);
