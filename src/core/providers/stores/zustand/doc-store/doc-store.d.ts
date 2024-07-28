import type { Document } from "@/core/interfaces/entities";

interface DocStore {
  documents: Document[] | null;
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: Document[] | null) => void;

  currentFolder: Document | "root";
  // eslint-disable-next-line no-unused-vars
  setCurrentFolder: (documents: Document | "root") => void;

  refetchDocs: boolean;
  toggleRefetchDocs: () => void;

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
