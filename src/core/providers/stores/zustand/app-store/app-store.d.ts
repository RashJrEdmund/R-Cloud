/* eslint-disable no-unused-vars */

import type {
  DisplayLayout,
  FolderSeparation,
  ColumnSeparation,
} from "@/core/interfaces/app";

interface AppStore {
  displayLayout: DisplayLayout;
  setDisplayLayout: (layout_type: DisplayLayout) => void;

  folderSeparation: FolderSeparation;
  setFolderSeparation: (_: FolderSeparation) => void;

  columnSeparation: ColumnSeparation;
  setColumnSeparation: (_: ColumnSeparation) => void;
}

export type { AppStore };
