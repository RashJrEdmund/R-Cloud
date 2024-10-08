import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface MainProps extends ComponentProps<"main"> {
  as?: keyof JSX.IntrinsicElements;
}

function MainTag({ className, as: Main = "main", ...restProps }: MainProps) {
  return (
    <Main
      {...(restProps as {})}
      className={cn(
        "mx-auto flex min-h-main_min_h w-full flex-col items-center justify-center rounded-[4px] pb-[2rem] pt-[5rem]",
        className
      )}
    />
  );
}

export default MainTag;
