import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminState = {
  admin: any;
  setAdmin: (admin: any) => void;
  logout: () => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),

      logout: () => set({ admin: null }), // ✅ clears persisted state automatically
    }),
    {
      name: "admin-storage",
    },
  ),
);
