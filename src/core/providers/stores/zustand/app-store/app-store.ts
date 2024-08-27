import { create } from "zustand";
import type { AppStore } from "./app-store.d";

const useAppStore = create<AppStore>((set) => {
  return {
    displayLayout: "GRID",

    setDisplayLayout: (new_layout) => {
      set({ displayLayout: new_layout });
    },

    folderSeparation: "NONE",
    setFolderSeparation: (folderSeparation) => set({ folderSeparation }),
  };
});

export { useAppStore };
