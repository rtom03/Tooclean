import Hero from "../components/Hero";
import TopSellers from "../components/TopSellers";
import BeforeAfter from "../components/BeforeAfter";
import { VideoReviews } from "../components/VideoReviews";
import HowTo from "../components/HowTo";
import { Helmet } from "react-helmet-async";

const HomeScreen = () => {
  return (
    <>
      <Helmet>
        <title>
          Too Clean Care | Premium Hairline Sprays & Grooming Products
        </title>

        <meta
          name="description"
          content="Shop your favourite hair products with Too Clean Care Africa, Now available ONLINE & IN SHOPS!."
        />
      </Helmet>
      <main>
        <Hero />
        <BeforeAfter />
        <TopSellers />
        {/* <HowTo /> */}
        <VideoReviews />
        <HowTo />
      </main>
      {/* <BeforeAfter /> */}
    </>
  );
};

export default HomeScreen;
