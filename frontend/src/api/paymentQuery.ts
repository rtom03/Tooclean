// api/paymentQuery.ts
import { useQuery } from "@tanstack/react-query";
import { verifyPayment } from "../services/apiServices";

export const useVerifyPayment = (reference?: string | null) => {
  return useQuery({
    queryKey: ["verify-payment", reference],

    queryFn: () => verifyPayment(reference!),

    enabled: !!reference,

    retry: false,
  });
};
