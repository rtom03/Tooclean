import type {
  Admin,
  InitializePaymentResponse,
  OrderInfo,
  Password,
} from "../constant/index.type";

const BASE_URL =
  import.meta.env.MODE === "production" ? "/api" : import.meta.env.VITE_API_URL; // const BASE_URL = "/api";

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

const createOrderData = async (data: { productId: string; qty: number }) => {
  const res = await fetch(`${BASE_URL}/order/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return await res.json();
};

const getOrderData = async (id: string) => {
  const res = await fetch(`${BASE_URL}/order/order-data/${id}`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return await res.json();
};

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
    throw new Error("Error fetching data");
  }
  return await res.json();
};

// Admin

const adminLogin = async (data: Admin) => {
  const res = await fetch(`${BASE_URL}/admin/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }

  return res.json();
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
const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/order/all-orders`, {
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

const getOrder = async (id: string) => {
  const res = await fetch(`${BASE_URL}/order?id=${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Failed to fetch order");
  }

  return res.json();
};

const updateOrder = async (id: string, status: string) => {
  const res = await fetch(`${BASE_URL}/order/update-order/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(status),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }
};

export {
  getProducts,
  getProduct,
  createOrderData,
  getOrderData,
  initializePayment,
  adminLogin,
  changePassword,
  getOrders,
  getOrder,
  updateOrder,
};
