import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface MainProps extends ComponentProps<"main"> {}

function MainTag({ className, ...restProps }: MainProps) {
  return (
    <main
      {...restProps}
      className={cn(
        "mx-auto flex min-h-main_min_height w-full flex-col rounded-[4px] pb-[2rem] pt-[2.5rem] sm:pt-[4rem]",
        className
      )}
    />
  );
}

export default MainTag;
