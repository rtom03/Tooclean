import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/tcblack.jpg",
  // "/review0.jpg",
  // "/review1.jpg",
  // "/Culture_Lifestyle2.jpg",
  // "/review2.jpg",
  // "/review3.jpg",
];

const ProductImageGallery = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative bg-[#F5EFE6] rounded-xl overflow-hidden aspect-square flex items-center justify-center group">
      {/* Image */}
      <img
        key={current}
        src={images[current]}
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
        {images.map((_, i) => (
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
  );
};

export default ProductImageGallery;
