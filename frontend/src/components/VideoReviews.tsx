import { useRef, useState } from "react";

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

const PRODUCT = { name: "Hairline Spray", price: "$24.99" };

const VideoCard = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="shrink-0 w-57 aspect-9/16 rounded-2xl overflow-hidden relative bg-[#222] group"
    >
      <video
        ref={videoRef}
        src={src}
        // muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-top"
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* product pill */}
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

const VideoReviews = () => {
  const trackRef = useRef<HTMLDivElement>(null);
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
    <section className="w-full py-5 bg-[#453224] overflow-hidden">
      <h2 className="flex justify-center text-2xl font-extrabold text-white tracking-tight mb-10">
        INSTANT HAIRLINE IN SECONDS
      </h2>

      {/* Carousel */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className={`flex gap-3 overflow-x-auto scrollbar-hide select-none px-7 pb-2
          ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {reviews.map((r) => (
          <VideoCard key={r.id} src={r.src} />
        ))}
      </div>
    </section>
  );
};

export default VideoReviews;
