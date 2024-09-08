/* FILE_DESC +=> ==================================
| Since file and folder cards have a common style, |
| i've written the shared style here and extended  |
| it in each component that uses it                |
================================================= */

import type { Document } from "@/core/interfaces/entities";

import { Skeleton } from "@/components/ui/skeleton";
import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";
import { Globe, Lock } from "lucide-react";
import SelectCheckbox from "./select-checkbox";
import { useAppStore, useSelectionStore } from "@/providers/stores/zustand";

function SharedMark({ doc }: { doc: Document }) {
  const { displayLayout } = useAppStore();
  const { selectionStart } = useSelectionStore();

  if (!doc?.sharedState?.isShared) return null;

  return doc.sharedState.accessType === "PUBLIC" ? (
    <Globe
      className={cn(
        "absolute rounded-full bg-app_bg_light text-app_text_grayed",
        displayLayout === "GRID" ? "size-5 top-[3px] right-[3px]" : selectionStart ? "size-3 bottom-0 m-2 left-[17px]" : "size-3 bottom-0 left-0 m-2",
      )} />
  ) : (
    <Lock
      className={cn(
        "absolute rounded-full bg-app_bg_light text-app_text_grayed",
        displayLayout === "GRID" ? "size-5 top-[3px] right-[3px]" : selectionStart ? "size-3 bottom-0 m-2 left-[17px]" : "size-3 bottom-0 left-0 m-2",
      )} />
  );
}

interface CardContainerProps extends ComponentProps<"div"> {
  document: Document;
}

function GridCardContainer({
  className,
  children,
  document,
  ...restProps
}: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative mx-auto my-[10px] flex min-h-[150px] w-full max-w-[130px] cursor-pointer select-none flex-col items-center justify-between overflow-hidden rounded-[4px] border border-app_border p-[10px] duration-300 hover:bg-app_bg_light sm:w-[120px] lg:w-[130px]",
        className
      )}
    >
      <SharedMark doc={document} />

      <SelectCheckbox className="absolute m-[10px]" document={document} />

      <>{children}</>
    </div>
  );
}

function ListCardContainer({
  className,
  children,
  document,
  ...restProps
}: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative flex w-full cursor-pointer select-none flex-nowrap justify-start border p-[12px_10px] duration-200 md:gap-1",
        className
      )}
    >
      <SharedMark doc={document} />

      <SelectCheckbox className="mr-[5px]" document={document} />

      <>{children}</>
    </div>
  );
}

// SHIMMER CARDS

function GridShimmerCard() {
  return (
    <div className="mx-auto my-[10px] flex h-fit min-h-[150px] w-[110px] flex-col items-start justify-between overflow-hidden px-[4px] py-[10px] sm:w-[120px] sm:overflow-auto">
      <Skeleton className="min-h-[80px] w-full" />

      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-[1rem] w-full" />
        <Skeleton className="h-[1rem] w-full" />
      </div>
    </div>
  );
}

function ListShimmerCard() {
  return (
    <Skeleton className="my-[2px] w-full flex-nowrap justify-start bg-app_bg_light px-[10px] py-[23px]" />
  );
}

export {
  // StyledDisplayCard,

  GridCardContainer,
  ListCardContainer,
  GridShimmerCard,
  ListShimmerCard,
};
