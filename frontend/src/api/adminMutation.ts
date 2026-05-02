// adminMutation.ts
import { useMutation } from "@tanstack/react-query";
import { adminLogin, changePassword } from "../services/apiServices";
import { useAdminStore } from "../store/adminStore";
import { toast } from "react-hot-toast"; // or your toast lib
import { useNavigate } from "react-router-dom";

const useAdminLogin = () => {
  const { setAdmin } = useAdminStore();

  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      setAdmin(data);
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });
};

const useAdminResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success("Password updated successfully");

      // optional but standard for security flows
      setTimeout(() => {
        navigate("/admin/login");
      }, 800);
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
};

export { useAdminLogin, useAdminResetPassword };
