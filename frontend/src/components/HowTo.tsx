import { useRef } from "react";
import { optimizeVideo } from "./VideoReviews";

const HowTo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // store ref globally
  const setRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    // videoRefs.current[index] = el;
  };
  return (
    <div className="w-full ">
      <video
        ref={setRef}
        src={optimizeVideo(
          "https://res.cloudinary.com/djnxc7hp4/video/upload/v1777720167/IMG_4678_eccji8.mp4",
        )}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-contain snap-center object-top"
      />
    </div>
  );
};

export default HowTo;
