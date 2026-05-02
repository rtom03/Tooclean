import { useEffect, useRef, useState } from "react";
import { NAIRA } from "../constant/index.type";

const reviews = [
  {
    id: 5,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530733/VideoReview5_rqbwsw.mp4",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530781/VideoReview4_iejulz.mov",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530798/VideoReview2_jldwd5.mp4",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530813/VideoReview3_eyoozc.mp4",
  },
  {
    id: 1,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530830/VideoReview1_fekqhl.mov",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776530708/VideoReview6_cltdmm.mp4",
  },
];

const PRODUCT = { name: "Hairline Spray", price: "₦13000" };

const optimizeVideo = (url: string) => {
  return url.replace("/upload/", "/upload/q_auto:good,f_auto,w_480/");
};

export const VideoCard = ({
  src,
  index,
  activeIndex,
  setActiveIndex,
  videoRefs,
}: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // store ref globally
  const setRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    videoRefs.current[index] = el;
  };

  const handleMouseEnter = () => videoRef.current?.play();

  const handleMouseLeave = () => {
    if (videoRef.current && activeIndex !== index) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    setActiveIndex(index);

    videoRefs.current.forEach((video: HTMLVideoElement, i: number) => {
      if (!video) return;

      if (i === index) {
        video.muted = false;
        video.play();
      } else {
        video.muted = true;
      }
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="shrink-0 w-57 aspect-9/16 rounded-2xl overflow-hidden relative bg-[#222] group"
    >
      <video
        ref={setRef}
        src={optimizeVideo(src)}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-contain snap-center object-top"
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* product pill (unchanged) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-2.5 py-2">
        <div className="w-7 h-7 rounded-lg bg-white flex-shrink-0 flex items-center justify-center">
          <svg className="w-4 h-4 fill-[#1a1a1a]" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-white leading-tight">
            {PRODUCT.name}
          </p>
          <span className="text-[11px] text-white/70">{PRODUCT.price}</span>
        </div>
      </div>
    </div>
  );
};

export const VideoReviews = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          // User scrolled past section
          videoRefs.current.forEach((video) => {
            if (!video) return;
            video.muted = true;
            video.pause(); // 🔥 important for performance
          });
        } else {
          // Section is back in view
          videoRefs.current.forEach((video) => {
            if (!video) return;
            video.play(); // resume autoplay feel
          });
        }
      },
      {
        threshold: 0.3, // triggers when ~30% visible
      },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.pageX - trackRef.current!.offsetLeft;
    scrollLeft.current = trackRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current!.offsetLeft;
    trackRef.current!.scrollLeft =
      scrollLeft.current - (x - startX.current) * 1.5;
  };

  const stopDrag = () => setDragging(false);

  return (
    <section
      className="w-full py-5 bg-[#453224] overflow-hidden"
      ref={sectionRef}
    >
      <h2 className="flex justify-center text-2xl font-extrabold text-white tracking-tight mb-10">
        INSTANT HAIRLINE IN SECONDS
      </h2>

      <div className="w-full flex justify-center px-4 md:px-10 lg:px-20 xl:px-32">
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className={`flex gap-3 max-w-fit snap-x snap-mandatory overflow-x-auto scrollbar-hide select-none px-7 pb-2
    ${dragging ? "cursor-grabbing" : "cursor-grab"}
    max-w-fit`}
        >
          {reviews.map((r, i) => (
            <VideoCard
              key={r.id}
              src={r.src}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              videoRefs={videoRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
