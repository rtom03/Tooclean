const BASE_URL = "http://localhost:8000/api";
// const BASE_URL = "/api";

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

const createOrderData = async (data: { productId: string; qty: number }) => {
  const res = await fetch(`${BASE_URL}/order/create-order-data`, {
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

export { getProducts, getProduct, createOrderData, getOrderData };
