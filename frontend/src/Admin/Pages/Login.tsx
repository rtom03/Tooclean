import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../components/Loader";
import { useAdminLogin } from "../../api/adminMutation";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const loginMutation = useAdminLogin();
  const { isPending, isError, failureReason } = loginMutation;
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginMutation.mutateAsync({ email, password });
      if (res) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const inputClass =
    "w-full border-[1.5px] border-[#e0e0e0] rounded-lg px-3.5 py-2.5 text-[14px] text-[#1a1a1a] placeholder:text-[#ccc] outline-none focus:border-[#1a1a1a] transition-colors";

  return (
    <div className="h-full bg-[#f7f7f5] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-3">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <p className="text-[17px] font-black text-[#1a1a1a]">Too Clean</p>
          <p className="text-[12px] text-[#888] mt-0.5">Admin Portal</p>
        </div>

        {/* Card */}
        <form
          className="bg-white border border-[#e8e8e8] rounded-2xl p-8"
          onSubmit={handleLogin}
        >
          <h2 className="text-[18px] font-black text-[#1a1a1a] mb-1">
            Welcome back
          </h2>
          <p className="text-[13px] text-[#888] mb-6">
            Sign in to your admin account
          </p>

          {/* Error */}
          {isError && (
            <div className="bg-[#fcebeb] border border-[#f09595] rounded-lg px-4 py-2.5 text-[13px] text-[#791f1f] mb-5">
              {failureReason}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#555] mb-1.5">
              Email
            </label>
            <input
              type="email"
              className={inputClass}
              placeholder="admin@tooclean.com"
              onChange={(e) => setEmail(e.target.value)}
              //   onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#555] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className={`${inputClass} pr-10`}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}

                // onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555] transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            title="submit"
            disabled={isPending}
            className="w-full bg-[#1a1a1a] text-white text-[14px] font-bold py-3 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isPending ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
