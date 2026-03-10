import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items:     [],
      addItem:   (item)   => set({ items: [...get().items.filter((i) => i.id !== item.id), item] }),
      removeItem:(id)     => set({ items: get().items.filter((i) => i.id !== id) }),
      clearCart: ()       => set({ items: [] }),
      total:     ()       => get().items.reduce((acc, i) => acc + i.price, 0),
    }),
    { name: 'syict-cart' },
  ),
);

export default useCartStore;
