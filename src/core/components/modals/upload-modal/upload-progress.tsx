"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { ProgressBar, ProgressBarShimmer } from "@/components/molecules";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/core/lib/utils";
import { useUploadModalContext } from "@/providers/stores/context";
import { useEffect } from "react";
import { toast } from "sonner";

function UploadProgress({ toastId = "" }: { toastId?: string | number }) {
  const { uploadTaskMinimized, selectedFiles, progress, currentUploadIndx } =
    useUploadModalContext();

  useEffect(() => {
    const lastProgress = selectedFiles.length - 1;

    if (progress && progress[lastProgress] >= 100) {
      // upload done,
      if (toastId) {
        // closing toast if it was opened;
        toast.dismiss(toastId);
      };
    }
  }, [progress, selectedFiles.length, toastId]);

  return (
    !progress ? (
      <div className="w-full">
        <Skeleton className="w-32 h-5 mb-1" />

        <ProgressBarShimmer />
      </div>
    ) :
      (
        <DivCard
          className={cn(
            "w-full flex-col items-start justify-start gap-[10px]",
            uploadTaskMinimized
              ? "w-[min(90vw,_350px)] rounded-lg bg-app_white p-3 shadow-lg"
              : ""
          )}
        >
          <DivCard className="flex-nowrap gap-[10px]">
            <TextTag>
              uploading {currentUploadIndx + 1} / {selectedFiles.length}
            </TextTag>

            <TextTag className="text-app_text_blue">
              {progress[currentUploadIndx].toFixed(1) + " %"}
            </TextTag>
          </DivCard>

          {progress[currentUploadIndx] ? (
            <ProgressBar
              progress_in_percentage={+progress[currentUploadIndx].toFixed(1)}
            />
          ) : (
            <ProgressBarShimmer />
          )}
        </DivCard>
      )
  );
}

export { UploadProgress };
