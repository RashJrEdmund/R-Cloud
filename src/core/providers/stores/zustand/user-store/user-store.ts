import { create } from "zustand";
import type { UserStore } from "./user-store.d";

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export { useUserStore };
