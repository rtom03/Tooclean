import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderData,
  getOrder,
  getOrderById,
  getOrders,
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

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id, // prevents running when id is undefined
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
