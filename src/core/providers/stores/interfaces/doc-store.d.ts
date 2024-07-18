import type { Document } from "@/core/interfaces/entities";

interface DocStore {
  documents: Document[] | null;
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: Document[] | null) => void;

  currentFolder: Document | "root";
  // eslint-disable-next-line no-unused-vars
  setCurrentFolder: (documents: Document | "root") => void;

  refetchPath: boolean;
  toggleRefetchPath: () => void;
}

export type { DocStore };
