// import { dummyData } from '@/core/ui/ui-constants';
import { create } from 'zustand';
import type { IDocStore } from '../../interfaces';

export const useDocStore = create<IDocStore>(set => ({
  documents: null,
  setDocuments: (documents) => set({ documents }),

  currentFolder: 'root',
  setCurrentFolder: (currentFolder) => set({ currentFolder }),

  refetchPath: false,
  toggleRefetchPath: () => set((prev) => ({
    ...prev,
    refetchPath: !prev.refetchPath,
  })),
}));
