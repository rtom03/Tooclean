const BASE_URL = "http://localhost:8000/api";

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

export { getProducts };
