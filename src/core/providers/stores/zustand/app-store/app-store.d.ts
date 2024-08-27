/* eslint-disable no-unused-vars */

import type { DisplayLayout, FolderSeparation } from "@/core/interfaces/app";

interface AppStore {
  displayLayout: DisplayLayout;
  setDisplayLayout: (layout_type: DisplayLayout) => void;

  folderSeparation: FolderSeparation;
  setFolderSeparation: (_: FolderSeparation) => void;
}

export type { AppStore };
