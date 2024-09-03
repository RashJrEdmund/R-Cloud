"use client";

import { DivCard } from "@/components/atoms";
import { useEffect, useState } from "react";
import { cn } from "@/core/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function ProgressBarShimmer({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("h-[20px] w-full rounded-[8px]", className)} />
  );
}

interface Props {
  sx?: string;
  sxInner?: string;

  progress_in_percentage: number;

  show_usage_colors?: boolean; // weather or not to show usage colors;
}

function ProgressBar({
  progress_in_percentage,

  sx = "",
  sxInner = "",

  show_usage_colors = false,
}: Props) {
  const [bgColor, setBgColor] = useState<string>("bg-app_blue");

  useEffect(() => {
    if (show_usage_colors) {
      if (progress_in_percentage <= 50) {
        setBgColor("bg-app_blue");
      } else if (progress_in_percentage <= 75) {
        setBgColor("bg-app_orange");
      } else {
        setBgColor("bg-app_error");
      }
    }
  }, [show_usage_colors, progress_in_percentage]);

  return (
    <DivCard
      className={cn(
        "relative h-[1rem] w-full overflow-hidden rounded-[8px] bg-app_bg_grayed",
        sx
      )}
    >
      <DivCard
        style={{
          width: `${progress_in_percentage}%`,
        }}
        className={cn(
          "absolute left-0 top-0 h-full rounded-[10px]",
          `${bgColor}` /* eg 95% */,
          // "w-[20%]",
          sxInner
        )}
      />
    </DivCard>
  );
}

export { ProgressBarShimmer, ProgressBar };
