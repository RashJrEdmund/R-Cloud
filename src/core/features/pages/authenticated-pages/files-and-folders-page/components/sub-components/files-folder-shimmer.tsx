import type { DisplayLayout } from "@/core/interfaces/app";
import StyledFileFolderDisplay from "../styled-file-folder-display";

import { GridShimmerCard, ListShimmerCard } from "./shared";

export default function FilesFolderShimmer({
  displayLayout,
}: {
  displayLayout: DisplayLayout;
}) {
  return (
    <StyledFileFolderDisplay
      className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
    >
      {displayLayout === "GRID"
        ? Array.from({ length: 16 }, (_, i) => i).map((i) => <GridShimmerCard key={i} />)
        : Array.from({ length: 16 }, (_, i) => i).map((i) => <ListShimmerCard key={i} />)
      }
    </StyledFileFolderDisplay>
  );
};
