import { create } from "zustand";

interface ToastStore {
  isVisible: boolean;
  hide: () => void;
}

export const toastStore = create<ToastStore>((set) => ({
  isVisible: false,
  hide: () => set({ isVisible: false }),
}));
