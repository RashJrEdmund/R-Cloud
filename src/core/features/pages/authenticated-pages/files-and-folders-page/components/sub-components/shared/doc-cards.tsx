/* FILE_DESC +=> ==================================
| Since file and folder cards have a common style, |
| i've written the shared style here and extended  |
| it in each component that uses it                |
================================================= */

import type { Document } from "@/core/interfaces/entities";

import { Skeleton } from "@/components/ui/skeleton";
import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";
import SelectCheckbox from "./select-checkbox";

interface CardContainerProps extends ComponentProps<"div"> {
  document: Document
};

function GridCardContainer({ className, children, document, ...restProps }: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative mx-auto my-[10px] flex min-h-[150px] w-full max-w-[130px] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[4px] border border-app_border p-[10px] duration-300 hover:bg-app_bg_light sm:w-[120px] lg:w-[130px]",
        className
      )}
    >
      <SelectCheckbox
        className="absolute m-[10px]"
        document={document}
      />

      <>
        {children}
      </>
    </div>
  );
};

function ListCardContainer({ className, children, document, ...restProps }: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "card flex w-full cursor-pointer flex-nowrap justify-start border p-[12px_10px] duration-200 md:gap-1",
        className
      )}
    >
      <SelectCheckbox
        className="mr-[5px]"
        document={document}
      />

      <>
        {children}
      </>
    </div>
  );
};

// SHIMMER CARDS

function GridShimmerCard() {
  return (
    <Skeleton className="mx-auto my-[10px] flex h-fit min-h-[150px] w-[110px] flex-col items-start justify-between overflow-hidden p-[10px] sm:w-[120px] sm:overflow-auto">
      <Skeleton className="min-h-[80px] w-full bg-app_bg_grayed" />

      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-[1rem] w-full bg-app_bg_grayed" />
        <Skeleton className="h-[1rem] w-full bg-app_bg_grayed" />
      </div>
    </Skeleton>
  );
}

function ListShimmerCard() {
  return (
    <Skeleton className="my-[2px] w-full flex-nowrap justify-start bg-app_bg_light px-[10px] py-[20px]" />
  );
}

export {
  // StyledDisplayCard,

  GridCardContainer,
  ListCardContainer,
  GridShimmerCard,
  ListShimmerCard,
};
