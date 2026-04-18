import { Outlet } from "react-router-dom";
import Marquee from "../components/Marquee";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className=" bg-[#FBF6F0]">
      <Marquee />
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
