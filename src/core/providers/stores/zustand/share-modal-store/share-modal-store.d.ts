import type { Document } from "@/core/interfaces/entities";

interface ShareModalStore<A, V> {
  userEmails: string[];
  setUserEmails: (_: string[]) => void;

  access: A;
  setAccess: (_: A) => void;

  viewerRole: V;
  setViewerRole: (_: V) => void;

  shareModalOpen: boolean;
  setShareModalOpen: (_: boolean) => void;

  fileToBeShared: Document | null;
  setFileToBeShared: (file: Document | null) => void;

  openShareModal: (_: Document) => void;
  copyFileShareLink: (_: Document, isPublic?: boolean) => void;

  /**
   * call when closing modal
   */
  cleanUpFunction: () => void;
}

export type {
  ShareModalStore,
};
