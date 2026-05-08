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
  deliveryPrice: z.number(),
});

export const NAIRA = "₦";

export type OrderInfo = z.infer<typeof createOrderSchema>;
export type Product = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    qty: number;
  };
};

export type Order = {
  id: string;
  productId: string;
  qty: number;
  price: number;
  total: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    qty: number;
  };
};

export type Admin = {
  email: string;
  password: string;
};

export type Password = {
  current: string;
  password: string;
  confirm: string;
};

export type InitializePaymentResponse = {
  message: string;
  payment_info: {
    id: string | undefined;
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

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "failed";

export type PaymentStatus = "unpaid" | "paid";

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  orderDetails: any; // 👇 we’ll refine this next
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paystackCustomerCode?: string | null;
  dedicatedAccountNo?: string | null;
  dedicatedBankName?: string | null;
  dedicatedAccountName?: string | null;
  paystackReference?: string | null;
  createdAt: string; // ISO string from backend
  updatedAt: string;
}
