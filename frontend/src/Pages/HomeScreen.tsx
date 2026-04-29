import Hero from "../components/Hero";
import TopSellers from "../components/TopSellers";
import BeforeAfter from "../components/BeforeAfter";
import { VideoReviews } from "../components/VideoReviews";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <VideoReviews />
      <TopSellers />
      <BeforeAfter />
    </>
  );
};

export default HomeScreen;
