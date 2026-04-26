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

export type OrderInfo = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
};

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
