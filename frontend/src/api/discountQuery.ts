import { useQuery } from "@tanstack/react-query";
import { getDiscountCodes } from "../services/apiServices";

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

export default useGetDiscountCodes;
