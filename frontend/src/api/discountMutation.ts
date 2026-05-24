import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscountCode } from "../services/apiServices";

const useCreateDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscountCode,

    onSuccess: () => {
      // refetch all discount codes
      queryClient.invalidateQueries({
        queryKey: ["discount-codes"],
      });
    },

    onError: (error: any) => {
      console.log(error.message);
    },
  });
};

export default useCreateDiscountCode;
