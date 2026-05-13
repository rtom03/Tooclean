import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomeScreen from "./Pages/HomeScreen";
import Founder from "./Pages/Founder";
import Checkout from "./Pages/CheckOut";
import TrackOrder from "./Pages/TrackOrder";
import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Pages/Product";
import Settings from "./Admin/Pages/Settings";
import AdminLogin from "./Admin/Pages/Login";
import Orders from "./Admin/Pages/Orders";
import AdminPublicRoute from "./Admin/AdminPublicRoute";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import ProductDetail from "./Pages/ProductDetails";
import CartBody from "./Pages/Cart";
import Emails from "./Admin/Pages/Emails";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="founder" element={<Founder />} />
        <Route path="cart" element={<CartBody />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Route>
      <Route element={<AdminLayout />}>
        {/* Public route */}
        <Route element={<AdminPublicRoute />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/emails" element={<Emails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
