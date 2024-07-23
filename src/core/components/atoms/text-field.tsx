import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface TextFieldProps extends ComponentProps<"input"> {}

export default function TextField({ className, ...restProps }: TextFieldProps) {
  return (
    <input
      {...restProps}
      className={cn("m-0 w-full rounded-[10px] p-[5px_10px]", className)}
    />
  );
}
