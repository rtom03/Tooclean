import { useState } from "react";
import ProductImageGallery from "../components/ProductImageGallery";
import { useNavigate, useParams } from "react-router-dom";
import { createOrderData } from "../services/apiServices";
import { Loader2 } from "lucide-react";
import { useProduct } from "../api/productQuery";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailsSkeleton";
import ErrorState from "../components/IsErrorState";

// generate bundles dynamically from product price
const generateBundles = (basePrice: number) => [
  {
    qty: 1,
    label: "1 Bottle",
    price: basePrice,
    // badge: "Free Shipping",
  },
  {
    qty: 2,
    label: "2 Bottle",
    price: basePrice * 2 - 500,
    badge: "Save ₦500 ",

    // badge: "Free Shipping",
  },
  {
    qty: 3,
    label: "3 Bottles",
    price: basePrice * 3 - 1500,
    badge: "Save ₦1500 ",
  },
  {
    qty: 5,
    label: "5 Bottles",
    price: basePrice * 5 - 5000, // 27% off
    badge: "Save ₦5000 ",
  },
];

const ProductDetail = () => {
  const [selected, setSelected] = useState<number>(1); // default select 1 bottle
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    setLoading(!loading);
    if (!data) return;

    const selectedBundle = bundles.find((b) => b.qty === selected);
    if (!selectedBundle) return;

    try {
      const res = await createOrderData({
        productId: data.product.id,
        qty: selectedBundle.qty,
      });
      setLoading(loading);
      navigate(`/check-out/${res.orderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isPending, isError, error } = useProduct(id!);
  if (isPending) return <ProductDetailSkeleton />;
  if (isError) return <ErrorState />;
  console.log(error);
  // console.log(data);
  const bundles = data ? generateBundles(data?.product.price) : [];

  return (
    <div className="max-w-5xl bg-[#F0E9DF] mx-auto px-7 py-12 grid grid-cols-1 md:grid-cols-2 gap-14">
      {/* LEFT — Image */}
      <ProductImageGallery images={data?.product.images ?? []} />

      {/* RIGHT — Info */}
      <div className="flex flex-col pt-2">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#888] mb-2">
          Too Clean — Hair Products
        </p>
        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-7">
          {data?.product.name ?? "Hairline Spray"}
        </h1>

        {/* Bundle header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-[1.5px] bg-[#1a1a1a]" />
          <span className="text-[11px] font-extrabold tracking-widest uppercase whitespace-nowrap">
            We Made This Easy For You
          </span>
          <div className="flex-1 h-[1.5px] bg-[#1a1a1a]" />
        </div>
        <p className="text-center text-[13px] text-[#666] italic mb-5">
          The more you buy, the more you save
        </p>

        {/* Bundle cards */}
        <div className="flex flex-col gap-4 mb-6">
          {bundles.map((b) => (
            <div
              key={b.qty}
              onClick={() => setSelected(b.qty)}
              className={`relative border-2 rounded-xl px-4 py-3.5 cursor-pointer flex items-center gap-4 transition-all
                ${selected === b.qty ? "border-[#1a1a1a]" : "border-[#e0e0e0]"}`}
            >
              {/* Badge */}
              <div className="absolute -top-3 right-3 bg-[#1a1a1a] text-white text-[9px] font-extrabold tracking-[0.08em] uppercase px-2.5 py-1 rounded whitespace-nowrap">
                {b.badge}
              </div>

              {/* Radio */}
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                  ${selected === b.qty ? "border-[#1a1a1a]" : "border-[#ccc]"}`}
              >
                {selected === b.qty && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
                )}
              </div>

              {/* Thumbnails — duplicate images based on qty */}
              <div className="relative shrink-0 flex items-center">
                {/* {Array.from({ length: b.qty }).map((_, i) => ( */}
                <img
                  // key={i}
                  src={data?.product.images?.[0] ?? "/placeholder.jpg"}
                  alt={data?.product.name}
                  className="w-10 h-10 object-contain"
                  // style={{ marginLeft: i > 0 ? -16 : 0 }} // overlap effect
                />
                {/* ))} */}
                {/* qty badge */}
                <div className="absolute -bottom-1 -left-1 bg-[#1a1a1a] text-white text-[9px] font-extrabold w-[18px] h-[18px] rounded flex items-center justify-center">
                  x{b.qty}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {b.label}
                </p>
                {/* <div className="flex gap-2 mt-1">
                  <span className="text-[11px] font-semibold text-[#1a7a3c]">
                    Free Shipping
                  </span>
                </div> */}
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-[17px] font-extrabold text-[#1a7a3c]">
                  ₦{b.price.toLocaleString("en-NG")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <button
          onClick={handleBuyNow}
          className="w-full bg-[#453224] text-white text-[14px] font-extrabold tracking-[0.05em] uppercase py-4 rounded-lg hover:opacity-85 transition-opacity active:scale-[0.98] flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Buy Now"}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ProductDetail;
