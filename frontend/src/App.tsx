import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomeScreen from "./Pages/HomeScreen";
import ProductDetail from "./Pages/ProductDeatil";
import Founder from "./Pages/Founder";
import Checkout from "./Pages/CheckOut";
import TrackOrder from "./Pages/TrackOrder";
import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Pages/Product";
import Settings from "./Admin/Pages/Settings";
import AdminLogin from "./Admin/Pages/Login";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/" element={<ProductDetail />} />
        <Route path="founder" element={<Founder />} />
        <Route path="/check-out" element={<Checkout />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        {/* <Route path="orders" element={<Orders />} /> */}
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
