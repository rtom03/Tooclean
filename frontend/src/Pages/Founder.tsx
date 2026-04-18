import { useRef, useState } from "react";

const Founder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  return (
    <div className=" md:max-w-2xl mx-auto px-5 py-16 flex flex-col items-center gap-10">
      {/* Video */}
      <div className="w-full relative rounded-2xl overflow-hidden bg-[#111] aspect-video cursor-pointer group">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dlcfbqjkz/video/upload/v1776534102/founders-story_o70l8v.mp4"
          preload="metadata"
          playsInline
          onEnded={() => setPlaying(false)}
          className="w-full h-full object-contain"
        />

        {/* Top header bar */}
        <div className="absolute top-0 left-0 right-0 px-4 py-3 bg-gradient-to-b from-black/60 to-transparent flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
            <svg className="w-4 h-4 fill-[#1a1a1a]" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <div>
            <p className="text-white text-[13px] font-bold leading-tight">
              The Story Behind Too Clean
            </p>
            <span className="text-white/60 text-[11px]">
              Too Clean — Hair Products
            </span>
          </div>
        </div>

        {/* Play / Pause overlay */}
        {!playing && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-[#1a1a1a] ml-1" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}

        {/* Tap to pause when playing */}
        {playing && <div onClick={togglePlay} className="absolute inset-0" />}
      </div>

      {/* Text */}
      <p className="text-center text-[15px] text-[#555] leading-relaxed max-w-lg">
        Too Clean was created with one mission: to provide real solutions for
        your hairline. Every formula is crafted with purpose, so you can feel
        confident, daily.
      </p>
    </div>
  );
};

export default Founder;
