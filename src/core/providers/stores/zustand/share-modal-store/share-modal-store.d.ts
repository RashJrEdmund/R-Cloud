import type { Document } from "@/core/interfaces/entities";

type ViewerRoles = "VIEWER" | "EDITOR";

type AccessType = "RESTRICTED" | "PUBLIC";

interface ShareModalStore {
  searching: boolean;
  setSearching: (_: boolean) => void;

  isSharing: boolean;
  setIsSharing: (_: boolean) => void;

  userEmails: string[];
  setUserEmails: (_: string[]) => void;

  accessType: AccessType;
  setAccessType: (_: AccessType) => void;

  viewerRole: ViewerRoles;
  setViewerRole: (_: ViewerRoles) => void;

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

export type { AccessType, ViewerRoles, ShareModalStore };
