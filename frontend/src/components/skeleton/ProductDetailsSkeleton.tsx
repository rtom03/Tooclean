const ProductDetailSkeleton = () => (
  <div className="max-w-5xl bg-[#F0E9DF] mx-auto px-7 py-12 grid grid-cols-1 md:grid-cols-2 gap-14 animate-pulse">
    {/* LEFT — Image gallery */}
    <div className="flex flex-col gap-3">
      <div className="bg-[#ddd3c7] rounded-xl aspect-square w-full" />
      {/* thumbnail strip */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-16 h-16 bg-[#ddd3c7] rounded-lg" />
        ))}
      </div>
    </div>

    {/* RIGHT — Info */}
    <div className="flex flex-col pt-2 gap-4">
      {/* Eyebrow */}
      <div className="h-3 w-36 bg-[#ddd3c7] rounded" />

      {/* Product name */}
      <div className="h-10 w-3/4 bg-[#ddd3c7] rounded-lg" />

      {/* Bundle header divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-[1.5px] bg-[#ddd3c7]" />
        <div className="h-3 w-40 bg-[#ddd3c7] rounded" />
        <div className="flex-1 h-[1.5px] bg-[#ddd3c7]" />
      </div>

      {/* Subtitle */}
      <div className="h-3 w-48 bg-[#ddd3c7] rounded mx-auto" />

      {/* Bundle cards */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="relative border-2 border-[#ddd3c7] rounded-xl px-4 py-3.5 flex items-center gap-4"
          >
            {/* Badge */}
            <div className="absolute -top-3 right-3 h-5 w-32 bg-[#ddd3c7] rounded" />

            {/* Radio */}
            <div className="w-[18px] h-[18px] rounded-full bg-[#ddd3c7] shrink-0" />

            {/* Thumbnail */}
            <div className="w-10 h-10 bg-[#ddd3c7] rounded shrink-0" />

            {/* Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3.5 w-20 bg-[#ddd3c7] rounded" />
              <div className="h-3 w-16 bg-[#ddd3c7] rounded" />
            </div>

            {/* Price */}
            <div className="h-5 w-20 bg-[#ddd3c7] rounded" />
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="h-14 w-full bg-[#ddd3c7] rounded-lg mt-2" />
    </div>
  </div>
);

export default ProductDetailSkeleton;
