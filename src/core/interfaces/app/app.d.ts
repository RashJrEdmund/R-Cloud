import type { FC } from "react";

type DisplayLayout = "GRID" | "LIST";

interface ContextMenuContentType {
  text: string;
  icon: FC<>;
  action: Function;
}

export type { DisplayLayout, ContextMenuContentType };
