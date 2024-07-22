"use client";

import { DivCard, TextTag } from "@/components/atoms";
import {
  calculatePercentage,
  getUsedSpaceVisualRepresentation,
} from "@/core/utils/helpers";
import { ProgressBar } from "..";
import { useMemo } from "react";

import type { UserProfile } from "@/core/interfaces/entities";
import { cn } from "@/core/lib/utils";

interface Props {
  userProfile: UserProfile | null;
  width?: string;
}

export default function UsedSpaceDisplay({
  userProfile,
  width = "min(100%, 500px)",
}: Props) {
  const usedSpaceVisualRep = useMemo<number>(
    () => getUsedSpaceVisualRepresentation(userProfile),
    [userProfile]
  );

  return userProfile ? (
    <DivCard
      className={cn("flex-col items-start justify-start", `w-[${width}]`)}
    >
      <TextTag size="0.9rem">
        Used space
        <TextTag color_type="success">
          {calculatePercentage(
            userProfile?.plan.used_bytes,
            userProfile?.plan.bytes
          ).ans.toFixed(2)}{" "}
          %
        </TextTag>
      </TextTag>

      <ProgressBar
        show_usage_colors
        progress_in_percentage={usedSpaceVisualRep}
        width="100%"
      />
    </DivCard>
  ) : null;
}
