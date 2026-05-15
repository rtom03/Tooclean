import { useQuery } from "@tanstack/react-query";
import {
  getOrderByOrderNumber,
  getOrderByPhone,
} from "../services/apiServices";

export const useTrackOrderByPhone = (phone?: string) => {
  return useQuery({
    queryKey: ["track-order-phone", phone],

    queryFn: () => {
      if (!phone) {
        throw new Error("Phone is required");
      }

      return getOrderByPhone(phone);
    },

    enabled: false,
  });
};

export const useTrackOrderByOrderNumber = (orderNumber?: string) => {
  return useQuery({
    queryKey: ["track-order-number", orderNumber],

    queryFn: () => {
      if (!orderNumber) {
        throw new Error("Order number is required");
      }

      return getOrderByOrderNumber(orderNumber);
    },

    enabled: false,
  });
};
