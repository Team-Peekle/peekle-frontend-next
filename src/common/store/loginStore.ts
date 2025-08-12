import { create } from "zustand";

interface LoginStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const loginStore = create<LoginStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
