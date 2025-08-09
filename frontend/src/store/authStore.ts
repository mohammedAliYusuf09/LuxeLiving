import type { User } from '@/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';



interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
      user: null,
      setUser: (user: User | null) =>
        set({ user }, false, 'setUser'),

      logout: () =>
        set({ isAuthenticated: false, user: null }, false, 'logout'),
    }),
    { name: 'AuthStore' } // This will show up in Redux DevTools
  )
);