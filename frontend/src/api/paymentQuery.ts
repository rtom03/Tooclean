// api/paymentQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getOrderAnalytics, verifyPayment } from "../services/apiServices";
type Order = {
  paymentStatus: string;
  total: number;
  state: string;
};
export const useVerifyPayment = (reference?: string | null) => {
  return useQuery({
    queryKey: ["verify-payment", reference],

    queryFn: () => verifyPayment(reference!),

    enabled: !!reference,

    retry: false,
  });
};

export const useGetAllOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["analytics"],
    queryFn: getOrderAnalytics,
  });
};
