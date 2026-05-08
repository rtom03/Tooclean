import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrder,
  getOrderData,
  getOrders,
  updateOrderStatus,
} from "../services/apiServices";
import type { Order } from "../constant/index.type";

export const useGetOrderById = (id: string) => {
  return useQuery<Order>({
    queryKey: ["orderData", id],
    queryFn: () => getOrderData(id),
    enabled: !!id, // prevents running when id is undefined
  });
};
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
