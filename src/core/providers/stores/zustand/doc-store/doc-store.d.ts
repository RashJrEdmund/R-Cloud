import type { Document } from "@/core/interfaces/entities";

interface DocStore {
  documents: Document[];
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: Document[]) => void;

  currentFolder: Document | "root";
  // eslint-disable-next-line no-unused-vars
  setCurrentFolder: (documents: Document | "root") => void;

  refetchDocs: boolean;
  toggleRefetchDocs: () => void;

  docDetailsData: Document | "root" | null;
  setDocDetailsData: (_: Document | "root" | null) => void;

  docDetailsModalOpen: boolean;
  setDocDetailsModalOpen: (_: boolean) => void;

  openDocDetailsModal: (_: Document | "root") => void;

  // API LOADING STATES
  /**
   * to show that documents are loading on the dom
   */
  loadingDocs: boolean;
  setLoadingDocs: (loading: boolean) => void;

  loadingCurrentFolder: boolean;
  setLoadingCurrentFolder: (loading: boolean) => void;

  /**
   * to show that documents are being uploaded on the dom
   */
  upLoadingDocs: boolean;
  setUpLoadingDocs: (loading: boolean) => void;

  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
}

export type { DocStore };
