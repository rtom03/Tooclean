const BeforeAfter = () => {
  return (
    <section className="w-full  flex flex-col items-center bg-[#fbf6f0]">
      <h2 className="text-3xl md:text-6xl font-black text-[#1a1a1a] text-center tracking-tight leading-none mb-12">
        Before & After
      </h2>

      <div className="grid grid-cols-2  w-full ">
        {[
          { label: "before", src: "/before.jpg" },
          { label: "after", src: "/after.jpg" },
        ].map(({ label, src }) => (
          <div key={label} className="relative">
            {/* accent shadow block */}
            <div className="absolute -bottom-2  w-3/5 h-3/5 bg-[#d4cfe8]  -z-10" />

            {/* image card */}
            <div className="relative aspect-3/4  overflow-hidden bg-[#e8e4f0]">
              <img
                src={src}
                alt={label}
                className="w-full h-full  object-cover"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />
              {/* label */}
              <span className="absolute bottom-4 left-4 bg-white text-[#1a1a1a] text-[14px] font-extrabold px-4 py-1.5 rounded-sm">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfter;
