import { create } from 'zustand';
import type { IUserStore } from '../../interfaces';

const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export {
  useUserStore,
};
