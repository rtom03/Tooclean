import { Link } from "react-router-dom";
import { useProducts } from "../api/productQuery";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import ErrorState from "./IsErrorState";

const TopSellers = () => {
  const { data, isPending, isError, error } = useProducts();
  if (isPending) return <ProductSkeleton />;
  console.log(error);
  if (isError) return <ErrorState />;
  return (
    <section className="w-full px-7 py-5 flex flex-col items-center bg-[#453224]">
      <h1 className="text-5xl font-bold text-[#FBF6F0] text-center tracking-tight mb-12">
        SHOP HERE
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl text-[#FBF6F0]">
        {data.products.map((p) => (
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
