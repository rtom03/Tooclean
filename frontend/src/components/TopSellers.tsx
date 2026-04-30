import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/apiServices";

type Product = {
  id: string;
  name: string;
  description: string;
  color: string;
  price: number;
  images: string;
}[];

const TopSellers = () => {
  const [products, setProducts] = useState<Product>([]);

  const fetchProducts = async () => {
    try {
      let data = await getProducts();
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full px-7 py-5 flex flex-col items-center bg-[#453224]">
      <h1 className="text-3xl font-bold text-[#FBF6F0] text-center tracking-tight mb-12">
        INSTANT HAIRLINE IN SECONDS{" "}
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl text-[#FBF6F0]">
        {products.map((p) => (
          <Link to={`/product/${p.id}`} key={p.id}>
            <div className="bg-[#453224] rounded-2xl overflow-hidden aspect-3/4">
              <img
                src={p.images[0]}
                alt={`Too Clean ${p.name}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="pt-4 px-1 ">
              <p className="text-[11px] font-bold tracking-[0.06em] uppercase ">
                {p.name}
              </p>
              <p className="text-[12px]  mt-0.5">{p.color}</p>
              <p className="text-[15px] font-semibold  mt-2">
                ₦{p.price.toLocaleString("en-NG")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopSellers;
