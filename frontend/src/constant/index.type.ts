import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z
    .string()
    .min(3, "Name must be at least 2 words")
    .regex(
      /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
      "Enter a valid full name (e.g. John Doe)",
    ),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(2, "Please select a state"),
});

export type OrderInfo = z.infer<typeof createOrderSchema>;
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

// export type OrderInfo = {
//   customerName: string;
//   email: string;
//   phone: string;
//   address: string;
//   state: string;
// };

export type InitializePaymentResponse = {
  message: string;
  payment_info: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    orderDetails: JSON;
    orderNumber: string;
    total: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    note: string;
  };
};
