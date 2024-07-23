"use client";

import { DivCard } from "@/components/atoms";
import { useEffect, useMemo, useState } from "react";
import { THEME_PALETTE } from "@/core/ui/theme";
import { cn } from "@/core/lib/utils";

interface Props {
  sx?: string;
  sxInner?: string;

  progress_in_percentage: number;

  show_usage_colors?: boolean; // weather or not to show usage colors;
}

export default function ProgressBar({
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
        "relative h-[20px] w-full rounded-[8px] bg-app_bg_grayed",
        sx
      )}
    >
      <DivCard
        className={cn(
          "absolute left-0 top-0 h-full rounded-[10px]",
          `w-[${progress_in_percentage}%] ${bgColor}` /* eg 95% */,
          "w-[20%]",
          sxInner
        )}
      />
    </DivCard>
  );
}
