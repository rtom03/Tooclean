export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
  description: string;
  qty: number;
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type Order = {
  id: string;
  productId: string;
  qty: number;
  price: number;
  total: number;
  createdAt: string;
  product: Product; // 👈 nested
};
