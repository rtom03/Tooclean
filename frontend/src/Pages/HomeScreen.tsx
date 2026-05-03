import Hero from "../components/Hero";
import TopSellers from "../components/TopSellers";
import BeforeAfter from "../components/BeforeAfter";
import { VideoReviews } from "../components/VideoReviews";
import HowTo from "../components/HowTo";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <BeforeAfter />
      <TopSellers />
      {/* <HowTo /> */}
      <VideoReviews />
      <HowTo />
      {/* <BeforeAfter /> */}
    </>
  );
};

export default HomeScreen;
