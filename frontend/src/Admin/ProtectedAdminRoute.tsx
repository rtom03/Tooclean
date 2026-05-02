import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";

const ProtectedAdminRoute = () => {
  const admin = useAdminStore((s) => s.admin);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
