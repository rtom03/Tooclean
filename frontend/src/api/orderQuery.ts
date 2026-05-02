import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrders } from "../services/apiServices";

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
