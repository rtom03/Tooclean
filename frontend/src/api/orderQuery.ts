import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderData,
  getOrderById,
  getOrders,
  getPaymentInfo,
  updateOrderStatus,
} from "../services/apiServices";
import type { OrderByIdResponse } from "../types/order";

export const useGetOrderById = (id: string) => {
  return useQuery<OrderByIdResponse>({
    queryKey: ["orderData", id],
    queryFn: () => getOrderById(id),
    enabled: !!id, // prevents running when id is undefined
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrderData,
  });
};

// ADMIN
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export const usePaymentInfo = (id?: string) => {
  return useQuery({
    queryKey: ["payment-info", id],
    queryFn: () => {
      if (!id) throw new Error("Missing id");
      return getPaymentInfo(id);
    },
    refetchInterval: 5000,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
