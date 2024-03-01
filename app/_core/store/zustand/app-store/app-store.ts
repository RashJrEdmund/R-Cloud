import { IAppStore } from '@/store/interfaces';
import { create } from 'zustand';

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
