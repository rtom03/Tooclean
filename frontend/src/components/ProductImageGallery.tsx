import { useState } from "react";
import type { TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../constant/index.type";

const SWIPE_THRESHOLD = 50; // minimum px distance to count as a swipe

const ProductImageGallery = ({ product }: Product) => {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const prev = () =>
    setCurrent((i) => (i === 0 ? product?.images.length - 1 : i - 1));
  const next = () =>
    setCurrent((i) => (i === product?.images.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null); // reset so a plain tap isn't treated as a swipe
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (distance > SWIPE_THRESHOLD) next(); // swiped left -> next image
    if (distance < -SWIPE_THRESHOLD) prev(); // swiped right -> previous image
  };

  return (
    <div className="flex flex-col gap-3.5">
      <div
        className="relative rounded-xl overflow-hidden aspect-square flex items-center justify-center group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <img
          key={current}
          src={product?.images[current]}
          alt={`Product image ${current + 1}`}
          className="w-full h-full object-cover  transition-opacity duration-300"
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
    </div>
  );
};

export default ProductImageGallery;
