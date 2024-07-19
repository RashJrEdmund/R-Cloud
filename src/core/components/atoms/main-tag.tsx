import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface MainProps extends ComponentProps<"main"> { };

function MainTag({ className, ...restProps }: MainProps) {
  return (
    <main
      {...restProps}
      className={cn("min-h-main_min_height flex flex-col mx-auto rounded-[4px] py-[2rem]", className)}
    />
  );
};

export default MainTag;
