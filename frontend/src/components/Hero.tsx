import { useState, useEffect } from "react";

const INTERVAL = 4000; // ms each view stays visible

const images: { label: string; src: string }[] = [
  { label: "before", src: "/before.jpg" },
  { label: "after", src: "/after.jpg" },
];

const Hero = () => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % 2), INTERVAL);
    return () => clearInterval(id);
  }, []);

  const fade = (isActive: boolean): string =>
    `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
    }`;

  return (
    <section className="w-full">
      {/* fixed shape: two 3:4 columns side by side = 3:2 overall */}
      <div className="relative w-full aspect-3/2 overflow-hidden">
        {/* view 1: side by side */}
        <div className={`${fade(active === 0)} grid grid-cols-2`}>
          {images.map(({ label, src }) => (
            <div key={label} className="relative h-full overflow-hidden">
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />
              <span className="absolute bottom-4 left-4 bg-white text-[#1a1a1a] text-[14px] font-extrabold px-4 py-1.5 rounded-sm">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* view 2: combined image */}
        <div className={fade(active === 1)}>
          <img
            src="/befo-afta1.jpg"
            alt="before and after"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
