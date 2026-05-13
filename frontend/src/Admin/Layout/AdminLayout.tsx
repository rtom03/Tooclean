import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

const AdminLayout = () => {
  const navigate = useNavigate();

  // const logout = useAdminStore((s) => s.logout);
  const { logout, admin } = useAdminStore();
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-[11px] font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-md transition-all
    ${isActive ? "text-white bg-white/12" : "text-white/50 hover:text-white hover:bg-white/8"}`;

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Top Nav */}
      <nav className="bg-[#1a1a1a] h-[52px] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-1">
          <span className="text-white font-black text-[15px] mr-5">
            Too Clean — Admin
          </span>
          <NavLink to="/admin/dashboard" className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={navClass}>
            Orders
          </NavLink>
          <NavLink to="/admin/settings" className={navClass}>
            Settings
          </NavLink>
          <NavLink to="/admin/emails" className={navClass}>
            Subscriber's Email
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white/60 text-[12px]">
            <div className="w-7 h-7 rounded-full bg-[#453224] flex items-center justify-center text-white text-[11px] font-bold">
              AD
            </div>
            Admin
          </div>
          <button
            onClick={handleLogout}
            className="text-[11px] text-white/50 border border-white/20 px-3 py-1.5 rounded-md hover:text-white hover:border-white/50 transition-all"
          >
            {admin ? "Log-Out" : "Log-In"}
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
