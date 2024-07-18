/* eslint-disable no-unused-vars */

import type { DisplayLayout } from "@/core/interfaces/app";

interface AppStore {
  displayLayout: DisplayLayout;
  setDisplayLayout: (layout_type: DisplayLayout) => void;
}

export type { AppStore };
