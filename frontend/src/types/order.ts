import type { Product } from "./product";

export type OrderItem = {
  id: string;

  orderId: string;

  productId: string;

  qty: number;

  price: number;

  subtotal: number;

  product: Product;
};

export type OrderByIdResponse = {
  id: string;

  total: number;

  status: string;

  createdAt: string;

  updatedAt: string;

  items: OrderItem[];
};
