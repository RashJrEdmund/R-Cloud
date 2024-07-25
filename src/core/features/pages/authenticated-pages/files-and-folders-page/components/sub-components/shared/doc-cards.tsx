/* FILE_DESC +=> ==================================
| Since file and folder cards have a common style, |
| i've written the shared style here and extended  |
| it in each component that uses it                |
================================================= */

import { Skeleton } from "@/components/ui/skeleton";
import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface CardContainerProps extends ComponentProps<"div"> {
  //
}

function GridCardContainer({ className, ...restProps }: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative mx-auto my-[10px] duration-300 cursor-pointer hover:bg-app_bg_light w-full max-w-[130px] sm:min-w-full overflow-hidden flex items-center justify-between flex-col border border-app_border rounded-[4px] p-[10px] sm:w-[120px] min-h-[150px]",
        className,
      )}
    />
  );
};

function ListCardContainer({ className, ...restProps }: CardContainerProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "card relative w-full cursor-pointer flex flex-nowrap justify-start md:gap-1 p-[12px_10px] border duration-200",
        className,
      )}
    />
  );
};

// SHIMMER CARDS

function GridShimmerCard() {
  return (
    <Skeleton className="w-[110px] flex flex-col items-start justify-between overflow-hidden sm:overflow-auto sm:w-[120px] h-fit min-h-[150px] mx-auto my-[10px] p-[10px]">
      <Skeleton className="w-full min-h-[80px] bg-app_bg_grayed" />

      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-full h-[1rem] bg-app_bg_grayed" />
        <Skeleton className="w-full h-[1rem] bg-app_bg_grayed" />
      </div>
    </Skeleton>
  )
};

function ListShimmerCard() {
  return (
    <Skeleton
      className="my-[2px] w-full flex-nowrap justify-start bg-app_bg_light px-[10px] py-[20px]"
    />
  )
};

export {
  // StyledDisplayCard,

  GridCardContainer,
  ListCardContainer,

  GridShimmerCard,
  ListShimmerCard
};
