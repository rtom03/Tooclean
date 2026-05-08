import { useRef, useState, useEffect } from "react";
import { optimizeVideo } from "./VideoReviews";

const HowTo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [clicked, setClicked] = useState(false);
  () => {
    if (!muted) console.log(muted);
  };

  // auto-mute when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setMuted(true);
          setClicked(false);
          if (videoRef.current) videoRef.current.muted = true;
        }
      },
      { threshold: 0.3 },
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    setMuted(false);
    setClicked(true);
  };

  return (
    <div
      onClick={!clicked ? handleClick : undefined}
      className="w-full relative overflow-hidden cursor-pointer"
      style={{ height: "66vh" }}
    >
      {/* blurred background — fills the gaps */}
      <video
        src={optimizeVideo(
          "https://res.cloudinary.com/djnxc7hp4/video/upload/v1777720167/IMG_4678_eccji8.mp4",
        )}
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: "blur(18px)", transform: "scale(1.15)" }}
      />

      {/* actual video — contained, shows full content */}
      <video
        ref={videoRef}
        src={optimizeVideo(
          "https://res.cloudinary.com/djnxc7hp4/video/upload/v1777720167/IMG_4678_eccji8.mp4",
        )}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="relative w-full h-full object-contain"
      />

      {/* tap to unmute */}
      {!clicked && (
        <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
            <span className="text-white text-[12px] font-semibold">
              Tap to unmute
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowTo;
