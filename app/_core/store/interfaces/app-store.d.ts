/* eslint-disable no-unused-vars */

import type { IDisplayLayout } from '@/interfaces/app';

interface IAppStore {
  displayLayout: IDisplayLayout;

  setDisplayLayout: (layout_type: IDisplayLayout) => void;
};

export type {
  IAppStore,
};
