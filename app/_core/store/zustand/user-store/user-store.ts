import { create } from 'zustand';
import type { IUserStore } from '../../interfaces';

const useUserStore = create<IUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));

export {
  useUserStore,
};
