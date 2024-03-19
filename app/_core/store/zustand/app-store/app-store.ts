import { create } from 'zustand';
import type { IAppStore } from '@/store/interfaces';

const useAppStore = create<IAppStore>((set) => {
  return {
    displayLayout: 'GRID',
    setDisplayLayout: (new_layout) => {
      set({ displayLayout: new_layout });
    },
  };
});

export {
  useAppStore,
};
