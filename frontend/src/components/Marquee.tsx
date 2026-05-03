import { useRef, useEffect } from "react";

const ITEMS = [
  "WATER PROOF",
  "LASTS UNTIL SHAMPOOED OUT",
  "SWEAT PROOF",
  "NATURAL LOOK",
];

const Marquee = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let raf: number;
    const speed = 0.5;
    const totalWidth = el.scrollWidth / 2; // half because we duplicate below

    const tick = () => {
      x -= speed;
      if (Math.abs(x) >= totalWidth) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const content = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden bg-[#453224] text-white py-2.5 select-none">
      <div ref={ref} className="flex whitespace-nowrap will-change-transform">
        {content.map((item, i) => (
          <span
            key={i}
            className="flex items-center text-[11px] font-bold tracking-[0.12em] uppercase"
          >
            {item}
            <span className="mx-6 opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
