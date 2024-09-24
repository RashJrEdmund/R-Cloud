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
import { Tooltip } from "@/components/ui/tooltip";

function SharedAccessTypeMark({ doc }: { doc: Document }) {
  const { displayLayout } = useAppStore();
  const { selectionStart } = useSelectionStore();

  if (!doc?.sharedState?.isShared) return null;

  return doc.sharedState.accessType === "PUBLIC" ? (
    <Globe
      className={cn(
        "absolute rounded-full bg-app_bg_light text-app_text_grayed",
        displayLayout === "GRID"
          ? "right-[3px] top-[3px] size-5"
          : selectionStart
            ? "bottom-0 left-[17px] m-2 size-3"
            : "bottom-0 left-0 m-2 size-3"
      )}
    />
  ) : (
    <Lock
      className={cn(
        "absolute rounded-full bg-app_bg_light text-app_text_grayed",
        displayLayout === "GRID"
          ? "right-[3px] top-[3px] size-5"
          : selectionStart
            ? "bottom-0 left-[17px] m-2 size-3"
            : "bottom-0 left-0 m-2 size-3"
      )}
    />
  );
}

interface CardContainerProps extends ComponentProps<"div"> {
  document: Document;
}

function DocNameWithToolTip({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <Tooltip title={title} className="w-full flex items-center justify-start">
      {children}
    </Tooltip>
  );
}

function GridCardContainer({
  className,
  children,
  document,
  ...restProps
}: CardContainerProps) {
  const { columnSeparation } = useAppStore();

  return (
    <div
      {...restProps}
      className={cn(
        "relative mx-auto my-[10px] flex cursor-pointer select-none flex-col items-center justify-between overflow-hidden rounded-[4px] border border-app_border p-[10px] duration-300 hover:bg-app_bg_light",
        columnSeparation === "OFF" ? "min-h-[150px] w-full max-w-[130px] sm:w-[120px] lg:w-[130px]" : "min-h-[300px] w-full",
        className
      )}
    >
      <SharedAccessTypeMark doc={document} />

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
      <SharedAccessTypeMark doc={document} />

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
  DocNameWithToolTip,

  // StyledDisplayCard,
  GridCardContainer,
  ListCardContainer,
  GridShimmerCard,
  ListShimmerCard,
};
