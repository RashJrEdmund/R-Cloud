import type { ComponentProps, LegacyRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/core/lib/utils";

interface TextFieldProps extends ComponentProps<"input"> {}

export default forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, ...restProps },
  ref
) {
  return (
    <input
      ref={ref as LegacyRef<HTMLInputElement>}
      {...restProps}
      className={cn(
        "m-0 w-full rounded-[8px] border border-app_border p-[5px_10px]",
        className
      )}
    />
  );
});
