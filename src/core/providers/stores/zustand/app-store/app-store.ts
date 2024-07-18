import { create } from "zustand";
import type { AppStore } from "@/providers/stores/interfaces";

const useAppStore = create<AppStore>((set) => {
  return {
    displayLayout: "GRID",
    setDisplayLayout: (new_layout) => {
      set({ displayLayout: new_layout });
    },
  };
});

export { useAppStore };
