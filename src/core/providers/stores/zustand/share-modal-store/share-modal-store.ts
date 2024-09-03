import type {
  AccessType,
  ShareModalStore,
  ViewerRoles,
} from "./share-modal-store.d";

import { create } from "zustand";
import { APP_CONFIG } from "@/core/config/app";
import { copyToClipboard } from "@/core/lib/utils";
import { Globe, Lock } from "lucide-react";

type ACCESS = {
  label: string;
  desc: string;
  icon: typeof Lock;
  type: AccessType;
};

type VIEWER = { label: string; desc: string; type: ViewerRoles };

const Access: ACCESS[] = [
  {
    label: "Restricted",
    desc: "Permitted users",
    icon: Lock,
    type: "RESTRICTED",
  },
  {
    label: "Public",
    desc: "Anyone with the link",
    icon: Globe,
    type: "PUBLIC",
  },
];

const Viewers: VIEWER[] = [
  {
    label: "viewer",
    desc: "can only read file",
    type: "VIEWER",
  },
  {
    label: "Editor",
    desc: "can read & write to file",
    type: "EDITOR",
  },
];

const useShareModalStore = create<ShareModalStore>((set) => ({
  searching: false,
  setSearching: (searching) => set({ searching }),

  isSharing: false,
  setIsSharing: (isSharing) => set({ isSharing }),

  userEmails: [],
  setUserEmails: (userEmails) => set({ userEmails }),

  accessType: "RESTRICTED",
  setAccessType: (accessType) => set({ accessType }),

  viewerRole: "VIEWER",
  setViewerRole: (viewerRole) => set({ viewerRole }),

  shareModalOpen: false,
  setShareModalOpen: (shareModalOpen) => set({ shareModalOpen }),

  fileToBeShared: null,
  setFileToBeShared: (fileToBeShared) => set({ fileToBeShared }),

  openShareModal: (file) =>
    set({
      fileToBeShared: file,
      shareModalOpen: true,
    }),

  copyFileShareLink: (file, isPublic = false) => {
    const url = `${APP_CONFIG.app_link}/shared/${isPublic ? "pub" : "me"}/${file.id}`;
    const msg = `${isPublic ? "Public" : "Private"} share url copied to clipboard`;

    copyToClipboard({ data: url, toast_header: msg });
  },

  cleanUpFunction: () =>
    set({
      fileToBeShared: null,
      searching: false,
      isSharing: false,
      // access: Access[0],
      // viewerRole: ViewerRoles[0],
      userEmails: [],
    }),
}));

const useShareModalAssets = {
  Access,
  Viewers,
};

export { useShareModalStore, useShareModalAssets };
