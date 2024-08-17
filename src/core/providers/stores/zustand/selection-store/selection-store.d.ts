import type { Document } from "@/core/interfaces/entities";

interface SelectionStore {
  // selection
  selectionStart: boolean;
  setSelectionStart: (selectionStart: boolean) => void;

  selectedDocs: Document[];
  setSelectedDocs: (selectedDocs: Document[]) => void;

  handleDocumentSelection: (doc: Document) => void;
  toggleDocumentSelection: () => void;
}

export type { SelectionStore };
