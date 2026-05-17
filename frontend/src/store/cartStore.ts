import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  qty: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (item: CartItem, qty?: number) => void;

  removeFromCart: (id: string) => void;

  removePurchasedItems: (purchasedIds: string[]) => void;

  incrementQty: (id: string) => void;

  decrementQty: (id: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item, qty = 0) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, qty }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      removePurchasedItems: (purchasedIds) =>
        set((state) => ({
          items: state.items.filter((item) => !purchasedIds.includes(item.id)),
        })),
      incrementQty: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),

      decrementQty: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.qty || 1, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    {
      name: "cart-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);
