import type {
  Admin,
  InitializePaymentResponse,
  OrderInfo,
  Password,
} from "../constant/index.type";

export type OrderItemPayload = {
  productId: string;
  qty: number;
};

export type CreateOrderPayload = {
  items: OrderItemPayload[];
};

export type Discount = {
  id: string;
  code: string;
  name: string;
  discount_price: number;
  isActive: boolean;
  createdAt: string;
};

const BASE_URL =
  import.meta.env.MODE === "production" ? "/api" : import.meta.env.VITE_API_URL; // const BASE_URL = "/api";

//DISCOUNT SERVICES
const createDiscountCode = async (data: {
  name: string;
  discount_price: number;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/discount/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(
        responseData?.message || "Failed to create discount code",
      );
    }

    return responseData;
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to server");
    }

    throw new Error(error?.message || "Something went wrong");
  }
};

const getDiscountCodes = async () => {
  try {
    const res = await fetch(`${BASE_URL}/discount/get-discounts`);
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(
        responseData?.message || "Failed to create discount code",
      );
    }
    return responseData;
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to server");
    }

    throw new Error(error?.message || "Something went wrong");
  }
};

const getDiscountByCode = async (code: string): Promise<Discount> => {
  try {
    const response = await fetch(
      `${BASE_URL}/discount/get-discount-by/${code}`,
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error ?? "Failed to fetch discount code");
    }

    const data: { discount: Discount } = await response.json();
    return data.discount;
  } catch (error) {
    console.error("Failed to fetch discount:", error);
    throw error;
  }
};

// PRODUCTS SERVICES

const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return await res.json();
};

const getProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return await res.json();
};

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    price?: number;
    files?: FileList | null;
  },
) => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.price) formData.append("price", data.price.toString());
  if (data.files) {
    Array.from(data.files).forEach((file) => formData.append("images", file));
  }

  const res = await fetch(`${BASE_URL}/products/update?id=${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
    // ⚠️ do NOT set Content-Type — browser sets it automatically with boundary for multipart
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update product");
  }

  return res.json();
};

export const removeProductExtraImages = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/remove-images?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to remove images");
  }

  return res.json();
};

// ORDERS SERVICES

const createOrderData = async (data: CreateOrderPayload) => {
  const res = await fetch(`${BASE_URL}/order/create-order`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating order");
  }

  return await res.json();
};

const getOrderById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/order/order-data/${id}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return await res.json();
};

export const getOrderByPhone = async (phone: string) => {
  const res = await fetch(`${BASE_URL}/order/track/phone?phone=${phone}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);

    throw new Error(err?.error || "Failed to fetch order");
  }

  return res.json();
};

export const getOrderByOrderNumber = async (orderNumber: string) => {
  const res = await fetch(
    `${BASE_URL}/order/track/order-number?orderNumber=${orderNumber}`,
    {
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => null);

    throw new Error(err?.error || "Failed to fetch order");
  }

  return res.json();
};

const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/order/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }

  return res.json();
};

const updateOrderStatus = async (id: string, status: string) => {
  const res = await fetch(`${BASE_URL}/order/update-status?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update status");
  }

  return res.json();
};

const getOrderAnalytics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/order/analytics`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data.orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// PAYMENTS SERVICES

const initializePayment = async (
  id: string,
  data: OrderInfo,
): Promise<InitializePaymentResponse> => {
  const res = await fetch(`${BASE_URL}/order/initialize-transfer/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err || err?.message || JSON.stringify(err));
  }
  return await res.json();
};

// services/apiServices.ts

const verifyPayment = async (reference: string) => {
  try {
    const res = await fetch(`${BASE_URL}/order/verify-payment/${reference}`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to verify payment");
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

const getPaymentInfo = async (id: string) => {
  const res = await fetch(`${BASE_URL}/order/payment-info?id=${id}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Failed to fetch order");
  }

  return res.json();
};

const mergePaymentOrder = async ({
  paymentId,
  items,
}: {
  paymentId: string;
  items: {
    productId: string;
    qty: number;
  }[];
}) => {
  const res = await fetch(
    `${BASE_URL}/order/merge-payment-order/${paymentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to merge order");
  }

  return await res.json();
};

// Admin

const adminLogin = async (data: Admin) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData?.message || "Invalid email or password");
    }
    return responseData;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

const changePassword = async (data: Password) => {
  const res = await fetch(`${BASE_URL}/admin/reset-passwd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }
  return res.json();
};

//admin orders view

export {
  getProducts,
  getProduct,
  createOrderData,
  getOrderById,
  initializePayment,
  verifyPayment,
  mergePaymentOrder,
  adminLogin,
  changePassword,
  getOrders,
  getPaymentInfo,
  updateOrderStatus,
  createDiscountCode,
  getDiscountCodes,
  getOrderAnalytics,
  getDiscountByCode,
};
