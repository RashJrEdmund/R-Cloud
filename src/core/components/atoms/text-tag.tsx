import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface DivCardProps extends ComponentProps<"span"> {
  as?: keyof JSX.IntrinsicElements;
}

export default function TextTag({
  className,
  as: Text = "span",
  ...restProps
}: DivCardProps) {
  return (
    <Text
      {...(restProps as {})}
      className={cn(
        "mx-[0.25px] flex h-fit w-fit items-center justify-center gap-[3px] p-0 text-[1rem] font-[400] text-[inherit]",
        className
      )}
    />
  );
}
