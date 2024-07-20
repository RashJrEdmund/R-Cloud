"use client";

import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface OverlayProps extends ComponentProps<"div"> {
  isOpen: boolean;
};

export default function Overlay({ className, isOpen, ...restProps }: OverlayProps) {
  return (
    <div
      {...restProps}
      className={cn(
        "fixed, top-0 left-0 w-full h-full z-[4] bg-overlay_gradient",
        className,
        isOpen ? "block" : "hidden"
      )}
    />
  )
};
