import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  rank: string | null;
  setAuth: (payload: { username: string; rank: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  rank: null,
  setAuth: ({ username, rank }) =>
    set({ isAuthenticated: true, username, rank }),
  clearAuth: () => set({ isAuthenticated: false, username: null, rank: null }),
}));

