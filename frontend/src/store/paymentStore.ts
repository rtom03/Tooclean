import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InitializePaymentResponse } from "../constant/index.type";

interface PaymentStore {
  paymentData: InitializePaymentResponse | null;
  setPaymentData: (data: InitializePaymentResponse | null) => void;
  clearPaymentData: () => void;
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      paymentData: null,

      setPaymentData: (data) => set({ paymentData: data }),

      clearPaymentData: () => set({ paymentData: null }),
    }),
    {
      name: "payment-storage",
    },
  ),
);
