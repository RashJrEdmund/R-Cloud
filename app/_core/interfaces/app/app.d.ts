type IDisplayLayout = 'GRID' | 'LIST';

interface ContextMenuContent {
  text: string;
  icon_url: string;
  action: Function;
};

export type {
  IDisplayLayout,

  ContextMenuContent,
};
