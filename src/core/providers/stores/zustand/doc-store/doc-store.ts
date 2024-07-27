// import { dummyData } from '@/core/ui/ui-constants';
import { create } from "zustand";
import type { DocStore } from "./doc-store.d";

export const useDocStore = create<DocStore>((set) => ({
  documents: null,
  setDocuments: (documents) => set({ documents }),

  currentFolder: "root",
  setCurrentFolder: (currentFolder) => set({ currentFolder }),

  refetchDocs: false,
  toggleRefetchDocs: () =>
    set((prev) => ({
      ...prev,
      refetchDocs: !prev.refetchDocs,
    })),

  loadingDocs: true,
  setLoadingDocs: (loadingDocs) => set({ loadingDocs }),

  loadingCurrentFolder: true,
  setLoadingCurrentFolder: (loadingCurrentFolder) => set({ loadingCurrentFolder }),

  upLoadingDocs: false,
  setUpLoadingDocs: (upLoadingDocs) => set({ upLoadingDocs }),

  uploadProgress: 0,
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
}));
