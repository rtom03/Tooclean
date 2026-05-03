const ProductSkeleton = () => (
  <section className="w-full px-7 py-5 flex flex-col items-center bg-[#453224]">
    {/* Title */}
    <div className="h-12 w-48 bg-[#5a3e2e] rounded-lg mb-12 animate-pulse" />

    {/* Grid */}
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          {/* Image */}
          <div className="bg-[#5a3e2e] rounded-2xl aspect-3/4 w-full" />

          {/* Info */}
          <div className="pt-4 px-1 flex flex-col gap-2">
            <div className="h-3 w-3/4 bg-[#5a3e2e] rounded" />
            <div className="h-3 w-1/2 bg-[#5a3e2e] rounded" />
            <div className="h-4 w-1/3 bg-[#5a3e2e] rounded" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductSkeleton;
