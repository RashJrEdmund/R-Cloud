import { create } from "zustand";
import type { UserStore } from "./user-store.d";

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  refetchCurrentUser: false,
  toggleRefetchCurrentUser: () =>
    set((prev) => ({
      ...prev,
      refetchCurrentUser: !prev.refetchCurrentUser,
    })),

  currentUserLoading: true,
  setCurrentUserLoading: (currentUserLoading) => set({ currentUserLoading }),

  /**
   * Use Profile
   */
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),

  refetchUserProfile: false,
  toggleRefetchUserProfile: () =>
    set((prev) => ({
      ...prev,
      refetchUserProfile: !prev.refetchUserProfile,
    })),

  userProfileLoading: true,
  setUserProfileLoading: (userProfileLoading) => set({ userProfileLoading }),
}));

export { useUserStore };
