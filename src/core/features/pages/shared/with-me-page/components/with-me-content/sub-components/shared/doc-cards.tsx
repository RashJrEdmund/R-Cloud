import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

function WithMeGridCardContainer({
  className,
  children,
  ...restProps
}: ComponentProps<"div">) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative mx-auto my-[10px] flex min-h-[150px] w-full max-w-[130px] cursor-pointer select-none flex-col items-center justify-between overflow-hidden rounded-[4px] border border-app_border p-[10px] duration-300 hover:bg-app_bg_light sm:w-[120px] lg:w-[130px]",
        className
      )}
    >
      {children}
    </div>
  );
}

function WithMeListCardContainer({
  className,
  children,
  ...restProps
}: ComponentProps<"div">) {
  return (
    <div
      {...restProps}
      className={cn(
        "relative flex w-full cursor-pointer select-none flex-nowrap justify-start border p-[12px_10px] duration-200 md:gap-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export { WithMeGridCardContainer, WithMeListCardContainer };
