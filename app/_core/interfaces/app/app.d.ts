type DisplayLayout = 'GRID' | 'LIST';

interface ContextMenuContent {
  text: string;
  icon_url: string;
  action: Function;
};

export type {
  DisplayLayout,

  ContextMenuContent,
};
