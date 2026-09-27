//zustand store for authentication
import create from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));