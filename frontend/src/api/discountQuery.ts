import { useQuery } from "@tanstack/react-query";
import {
  getDiscountByCode,
  getDiscountCodes,
  type Discount,
} from "../services/apiServices";

export interface DiscountCode {
  name: string;
  discountPrice: number;
  code: string;
}

interface DiscountCodesResponse {
  success: boolean;
  count: number;
  data: DiscountCode[];
}

const useGetDiscountCodes = () => {
  return useQuery<DiscountCodesResponse>({
    queryKey: ["discount-codes"],
    queryFn: getDiscountCodes,
  });
};

export const useGetDiscountByCode = (
  code: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<Discount>({
    queryKey: ["discount", code],
    queryFn: () => getDiscountByCode(code),
    enabled: !!code,
    ...options, // spread the options in
    retry: false, // don't retry on 404/400
  });
};

export default useGetDiscountCodes;
