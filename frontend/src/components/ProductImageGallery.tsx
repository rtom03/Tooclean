import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../constant/index.type";
import { Link } from "react-router-dom";

const ProductImageGallery = ({ product }: Product) => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((i) => (i === 0 ? product?.images.length - 1 : i - 1));
  const next = () =>
    setCurrent((i) => (i === product?.images.length - 1 ? 0 : i + 1));

  const { addToCart, items } = useCartStore();

  return (
    <div className="flex flex-col gap-3.5">
      <div className="relative bg-[#F5EFE6] rounded-xl overflow-hidden aspect-square flex items-center justify-center group">
        {/* Image */}
        <img
          key={current}
          src={product?.images[current]}
          alt={`Product image ${current + 1}`}
          // className="w-full h-full object-cover p-8 transition-opacity duration-300"
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={18} className="text-[#1a1a1a]" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={18} className="text-[#1a1a1a]" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {product?.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-[#1a1a1a] w-3" : "bg-[#1a1a1a]/30"
              }`}
            />
          ))}
        </div>
      </div>
      <div
        className="bg-[#1a1a1a] py-2 px-1.5 justify-center text-center text-white"
        onClick={() => addToCart(product, product.qty)}
      >
        {items.find((item) => item.id == product.id) ? (
          <Link to={"/cart"}>Go To Cart</Link>
        ) : (
          <button>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
