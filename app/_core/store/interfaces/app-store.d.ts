/* eslint-disable no-unused-vars */

import type { DisplayLayout } from '@/interfaces/app';

interface IAppStore {
  displayLayout: DisplayLayout;

  setDisplayLayout: (layout_type: DisplayLayout) => void;
};

export type {
  IAppStore,
};
