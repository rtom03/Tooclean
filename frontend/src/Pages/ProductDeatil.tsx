import { useState } from "react";
import ProductImageGallery from "../components/ProductImageGallery";
import { Link } from "react-router-dom";

const bundles = [
  {
    id: 1,
    label: "1 Bottle",
    price: "$24.99",
    oldPrice: null,
    discount: null,
    badge: "Free Shipping",
    qty: 1,
  },
  {
    id: 2,
    label: "2 Bottles",
    price: "$40.00",
    oldPrice: "$50.00",
    discount: "20% OFF",
    badge: "Free Shipping",
    qty: 2,
  },
  {
    id: 3,
    label: "3 Bottles",
    price: "$55.00",
    oldPrice: "$75.00",
    discount: "27% OFF",
    badge: "Save the Most + Free Shipping",
    qty: 3,
  },
];

const ProductDetail = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="max-w-5xl bg-[#F0E9DF] mx-auto px-7 py-12 grid grid-cols-1 md:grid-cols-2 gap-14">
      {/* LEFT — Image */}
      <ProductImageGallery />

      {/* RIGHT — Info */}
      <div className="flex flex-col pt-2">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#888] mb-2">
          Too Clean — Hair Products
        </p>
        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-7">
          Hairline Spray
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
        <div className="flex flex-col gap-3 mb-6">
          {bundles.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelected(b.id)}
              className={`relative border-2 rounded-xl px-4 py-3.5 cursor-pointer flex items-center gap-4 transition-all
                ${selected === b.id ? "border-[#1a1a1a]" : "border-[#e0e0e0]"}`}
            >
              {/* Badge */}
              <div className="absolute -top-3 right-3 bg-[#1a1a1a] text-white text-[9px] font-extrabold tracking-[0.1em] uppercase px-2.5 py-1 rounded">
                {b.badge}
              </div>

              {/* Radio */}
              <div
                className={`w-4.5 h-5.4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                ${selected === b.id ? "border-[#1a1a1a]" : "border-[#ccc]"}`}
              >
                {selected === b.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
                )}
              </div>

              {/* Thumbnail */}
              <div className="relative shrink-0">
                <img
                  src="/tcblack.jpg"
                  alt={b.label}
                  className="w-12 h-12 object-contain"
                />
                <div className="absolute -bottom-1 -left-1 bg-[#1a1a1a] text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded flex items-center justify-center">
                  x{b.qty}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {b.label}
                </p>
                <div className="flex gap-2 mt-1">
                  {b.discount && (
                    <span className="text-[11px] font-semibold text-[#555]">
                      {b.discount}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-[#1a7a3c]">
                    Free Shipping
                  </span>
                </div>
              </div>
              {/* Price */}
              <div className="text-right">
                <p className="text-[17px] font-extrabold text-[#1a7a3c]">
                  {b.price}
                </p>
                {b.oldPrice && (
                  <p className="text-[12px] text-[#aaa] line-through">
                    {b.oldPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to={"/check-out"}>
          <button className="w-full bg-[#453224] text-white text-[14px] font-extrabold tracking-[0.05em] uppercase py-4 rounded-lg hover:opacity-85 transition-opacity">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
