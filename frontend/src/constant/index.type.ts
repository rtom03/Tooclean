import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(3, "Name is required")
    .regex(
      /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/,
      "Enter a valid full name (e.g. John Doe)",
    ),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(2, "Please select a state"),
  deliveryPrice: z.number(),
  discountCode: z.string(),
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
    authorization_url: string;
    access_code: string;
    paystackReference: string;
    amount: number;
    paymentStatus: string;
    deliveryPrice: number;
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
export type Prod = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  qty: number;
};
interface OrderItem {
  createdAt: string;
  id: string;
  status: string;
  total: number;
  updatedAt: string;
  items: [{ productId: string; qty: number; product: Prod }];
}
export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  orderDetails: OrderItem; // 👇 we’ll refine this next
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paystackCustomerCode?: string | null;
  discountCode?: string | null;
  deliveryStatus: string;
  // authorization_url: string;
  // access_code: string;
  // paystackReference?: string | null;
  createdAt: string; // ISO string from backend
  updatedAt: string;
}
export type TrackingHistory = {
  orderStatus: string;
  statusCreationDate: string;
  statusDescription: string;
};

export type OrderTrackingDetails = {
  orderNo: string;
  orderStatus: string;
  recipientName: string;
  recipientAddress: string;
  recipientState: string;
  createdAt: string;
  proofOfDelivery: string | null;
};

export type TrackedOrder = {
  status: string;
  description: string;
  order: OrderTrackingDetails;
  history: TrackingHistory[];
};

export type TrackOrderResponse = {
  trackedOrder: TrackedOrder;
};
