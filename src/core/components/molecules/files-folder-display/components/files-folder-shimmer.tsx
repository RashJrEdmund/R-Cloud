import type { DisplayLayout } from "@/core/interfaces/app";
import StyledFileFolderDisplay from "../styled-file-folder-display";
import { StyledShimmerCard } from "./shared";
import { DivCard } from "@/components/atoms";

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
        ? new Array(16).fill(null).map((_, i) => <StyledShimmerCard key={i} />)
        : new Array(16).fill(null).map((_, i) => (
            <DivCard
              key={i}
              className="my-[2px] w-full cursor-pointer flex-nowrap justify-start bg-app_bg_light px-[10px] py-[20px]"
            >
              {null}
            </DivCard>
          ))}
    </StyledFileFolderDisplay>
  );
}
