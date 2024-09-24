import FileFolderDisplayContainer from "./file-folder-display-container";

import { GridShimmerCard, ListShimmerCard } from "../../sub-components/shared";
import { useFilesFolderShimmerCache } from "@/providers/hooks";
import { useAppStore } from "@/providers/stores/zustand";

export default function FilesFolderShimmer() {
  const { displayLayout } = useAppStore();
  const { cardCount } = useFilesFolderShimmerCache();

  return (
    <FileFolderDisplayContainer>
      {displayLayout === "GRID"
        ? Array.from({ length: cardCount }, (_, i) => i).map((i) => (
          <GridShimmerCard key={i} />
        ))
        : Array.from({ length: cardCount }, (_, i) => i).map((i) => (
          <ListShimmerCard key={i} />
        ))}
    </FileFolderDisplayContainer>
  );
}
