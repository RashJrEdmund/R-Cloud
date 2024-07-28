"use client";

import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface OverlayProps extends ComponentProps<"hr"> {
  //
}

export default function Separator({ className, ...restProps }: OverlayProps) {
  return (
    <hr
      {...restProps}
      className={cn("my-8 w-full bg-app_bg_light", className)}
    />
  );
}
