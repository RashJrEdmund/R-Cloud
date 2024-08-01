import { create } from "zustand";
import type { SelectionStore } from "./selection-store.d";

const useSelectionStore = create<SelectionStore>((set) => ({
  selectionStart: false,
  setSelectionStart: (selectionStart) => set({ selectionStart }),

  selectedDocs: [],
  setSelectedDocs: (selectedDocs) => set({ selectedDocs }),

  handleDocumentSelection: (document) =>
    set((_) => {
      const { selectionStart, selectedDocs } = _;

      const prev = { ..._ };

      if (!selectionStart) prev.selectionStart = true;

      if (selectedDocs.find((doc) => doc.id === document.id)) {
        const update = selectedDocs.filter((doc) => doc.id !== document.id);

        prev.selectedDocs = update;
        return { ...prev };
      }

      return {
        ...prev,
        selectedDocs: [...selectedDocs, document],
      };
    }),

  toggleDocumentSelection: () =>
    set((prev) => {
      if (prev.selectionStart) {
        // then we should stop selection
        return {
          ...prev,
          selectionStart: false,
          selectedDocs: [],
        };
      }

      return {
        ...prev,
        selectionStart: true,
      };
    }),
}));

export { useSelectionStore };
