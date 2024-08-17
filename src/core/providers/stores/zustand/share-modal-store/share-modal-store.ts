import { create } from "zustand";
import { ShareModalStore } from "./share-modal-store.d";
import { APP_CONFIG } from "@/core/config/app";
import { copyToClipboard } from "@/core/lib/utils";
import { Globe, Lock } from "lucide-react";

const Access = [
  {
    label: "Restricted",
    desc: "Permitted users",
    icon: Lock,
    isPublic: false,
  },
  {
    label: "Public",
    desc: "Anyone with the link",
    icon: Globe,
    isPublic: true,
  },
] as const;

const ViewerRoles = [
  {
    label: "Viewer",
    desc: "can only read file",
  },
  {
    label: "Editor",
    desc: "can read & write to file",
  },
];

type AccessType = (typeof Access)[number];

type ViewerType = (typeof ViewerRoles)[number];

const useShareModalStore = create<ShareModalStore<AccessType, ViewerType>>((set) => ({
  userEmails: [
    "rash@gmail.com",
    "arreyetta@gmail.com",
    "orashusedmund@gmail.com",
    "testuser@gmail.com",
    "malone@gmail.com",
    "mesmer@gmail.com",
    "alaric@gmail.com",
    "mr_gaston@gmail.com",
  ],
  setUserEmails: (userEmails) => set({ userEmails }),

  access: Access[0],
  setAccess: (access) => set({ access }),

  viewerRole: ViewerRoles[0],
  setViewerRole: (viewerRole) => set({ viewerRole }),

  shareModalOpen: false,
  setShareModalOpen: (shareModalOpen) => set({ shareModalOpen }),

  fileToBeShared: null,
  setFileToBeShared: (fileToBeShared) => set({ fileToBeShared }),

  openShareModal: (file) => set({
    fileToBeShared: file,
    shareModalOpen: true,
  }),

  copyFileShareLink: (file, isPublic = false) => {
    const url = `${APP_CONFIG.app_link}/shared/me/${file.id}`;
    const msg = `${isPublic ? "Public" : "Private"} share url copied to clipboard`;

    copyToClipboard({ data: url, toast_header: msg });
  },

  cleanUpFunction: () => set({
    fileToBeShared: null,
    access: Access[0],
    viewerRole: ViewerRoles[0],
    userEmails: [],
  }),
}));

const useShareModalAssets = {
  Access,
  ViewerRoles,
};

export {
  useShareModalStore,
  useShareModalAssets,
};
