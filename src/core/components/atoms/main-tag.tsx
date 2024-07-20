import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface MainProps extends ComponentProps<"main"> { };

function MainTag({ className, ...restProps }: MainProps) {
  return (
    <main
      {...restProps}
      className={cn("bg-blue-200 w-full min-h-main_min_height flex flex-col mx-auto rounded-[4px] pt-[2.5rem] sm:pt-[4rem] pb-[2rem]", className)}
    />
  );
};

export default MainTag;
