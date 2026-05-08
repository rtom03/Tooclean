import { useMutation } from "@tanstack/react-query";
import { initializePayment } from "../services/apiServices";
import type {
  InitializePaymentResponse,
  OrderInfo,
} from "../constant/index.type";

type InitializePaymentPayload = {
  id: string | undefined;
  data: OrderInfo;
};

export const useInitializePayment = () => {
  return useMutation<
    InitializePaymentResponse,
    Error,
    InitializePaymentPayload
  >({
    mutationFn: ({ id, data }) => initializePayment(id!, data),
  });
};
