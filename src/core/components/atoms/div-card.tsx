import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface DivCardProps extends ComponentProps<"div"> {
  as?: keyof JSX.IntrinsicElements;
}

export default function DivCard({
  className,
  as: Div = "div",
  ...restProps
}: DivCardProps) {
  return (
    <Div
      {...(restProps as {})}
      className={cn(
        "m-0 flex h-fit w-fit items-center justify-center border-app_border outline-none",
        className
      )}
    />
  );
}
