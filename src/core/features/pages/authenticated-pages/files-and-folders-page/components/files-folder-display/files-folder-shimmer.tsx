import type { DisplayLayout } from "@/core/interfaces/app";
import StyledFileFolderDisplay from "./styled-file-folder-display";

import { GridShimmerCard, ListShimmerCard } from "../sub-components/shared";
import { useFilesFolderShimmerCache } from "@/providers/hooks";

export default function FilesFolderShimmer({
  displayLayout,
}: {
  displayLayout: DisplayLayout;
}) {
  const { cardCount } = useFilesFolderShimmerCache();

  return (
    <StyledFileFolderDisplay
      className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
    >
      {displayLayout === "GRID"
        ? Array.from({ length: cardCount }, (_, i) => i).map((i) => (
          <GridShimmerCard key={i} />
        ))
        : Array.from({ length: cardCount }, (_, i) => i).map((i) => (
          <ListShimmerCard key={i} />
        ))}
    </StyledFileFolderDisplay>
  );
}
