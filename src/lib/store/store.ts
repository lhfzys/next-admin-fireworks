import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User } from '../types/user-type';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogin: boolean;
  isHydrated: boolean;
  setAuth: (data: Partial<Omit<AuthState, 'setAuth' | 'logout' | 'updateTokens'>>) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLogin: false,
      isHydrated: false,
      setAuth: (data) => set((state) => ({ ...state, ...data })),
      logout: () => set({ accessToken: null, refreshToken: null, user: null, isLogin: false }),
      updateTokens: (accessToken, refreshToken) => {
        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
          isLogin: true,
        }));
      },
    })),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isLogin: state.isLogin,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    },
  ),
);

export function updateTokens(accessToken: string, refreshToken: string) {
  useAuthStore.setState((state) => ({
    ...state,
    accessToken,
    refreshToken,
    isLogin: true,
  }));
}
