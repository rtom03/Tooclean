import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  removeProductExtraImages,
  updateProduct,
} from "../services/apiServices";

type Product = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    qty: number;
  };
};

type Products = {
  products: {
    id: string;
    name: string;
    description: string;
    color: string;
    price: number;
    images: string;
  }[];
};

export const useProducts = () => {
  return useQuery<Products>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id, // prevents running when id is undefined
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; price?: number; files?: FileList | null };
    }) => updateProduct(id, data),

    onSuccess: () => {
      // refetch products table after update
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useRemoveProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeProductExtraImages(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
