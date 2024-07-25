// import { dummyData } from '@/core/ui/ui-constants';
import { create } from "zustand";
import type { DocStore } from "./doc-store.d";

export const useDocStore = create<DocStore>((set) => ({
  documents: null,
  setDocuments: (documents) => set({ documents }),

  currentFolder: "root",
  setCurrentFolder: (currentFolder) => set({ currentFolder }),

  refetchPath: false,
  toggleRefetchPath: () =>
    set((prev) => ({
      ...prev,
      refetchPath: !prev.refetchPath,
    })),
}));
