"use client";

import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface OverlayProps extends ComponentProps<"div"> {
  isOpen: boolean;
}

export default function Overlay({
  className,
  isOpen,
  ...restProps
}: OverlayProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "fixed, left-0 top-0 z-[4] h-full w-full bg-overlay_gradient",
        className,
        isOpen ? "block" : "hidden"
      )}
    />
  );
}
