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
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  userProfile: UserProfile | null;
  className?: string;
}

function UsedSpaceShimmer() {
  return (
    <div className="flex w-[min(100%,_500px)] flex-col items-start justify-start gap-1">
      <Skeleton className="h-[1.2rem] w-full max-w-[120px]" />

      {/* <Skeleton className="h-[1.3rem] w-full rounded-[10px]" /> */}
      <Skeleton className="h-[150px] w-full rounded-[10px]" />
    </div>
  );
}

export default function UsedSpaceDisplay({ userProfile, className }: Props) {
  const usedSpaceVisualRep = useMemo<number>(
    () => getUsedSpaceVisualRepresentation(userProfile),
    [userProfile]
  );

  return !userProfile ? (
    <UsedSpaceShimmer />
  ) : (
    <DivCard
      className={cn(
        "w-[min(100%,_500px)] flex-col items-start justify-start",
        className
      )}
    >
      <TextTag className="text-[0.9rem]">
        Used space
        <TextTag className="text-app_text_blue">
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
        sx="w-full h-[150px]"
      />
    </DivCard>
  );
}
