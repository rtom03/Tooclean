import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";

const AdminPublicRoute = () => {
  const admin = useAdminStore((s) => s.admin);

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminPublicRoute;
