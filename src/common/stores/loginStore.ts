import { deleteCookie, getCookie } from 'cookies-next';
import { create } from 'zustand';

interface LoginStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  checkLoginStatus: () => void;
}

export const loginStore = create<LoginStore>((set, _get) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    set({ isLoggedIn: false });
  },
  checkLoginStatus: () => {
    const accessToken = getCookie('accessToken');
    set({ isLoggedIn: !!accessToken });
  },
}));
