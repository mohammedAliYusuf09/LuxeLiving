import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as required
}

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setItemAuthWithExpiry: (key: string, value: boolean, ttl: number) => void;
  getItemAuthWithExpiry: (key: string) => boolean | null;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }, false, 'setIsAuthenticated'),

      setItemAuthWithExpiry: (key: string, value: boolean, ttl: number) => {
        const now = new Date();
        const item = {
          value: value,
          expiry: now.getTime() + ttl, // `ttl` is in milliseconds
        };

        localStorage.setItem(key, JSON.stringify(item));
      },

    getItemAuthWithExpiry : (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      // Item has expired
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
    },

      user: null,
      setUser: (user: User | null) =>
        set({ user }, false, 'setUser'),

      logout: () =>
        set({ isAuthenticated: false, user: null }, false, 'logout'),
    }),
    { name: 'AuthStore' } // This will show up in Redux DevTools
  )
);