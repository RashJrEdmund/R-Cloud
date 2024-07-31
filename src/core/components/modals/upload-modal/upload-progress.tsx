"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { ProgressBar, ProgressBarShimmer } from "@/components/molecules";
import { cn } from "@/core/lib/utils";
import { useUploadModalContext } from "@/providers/stores/context";

function UploadProgress() {
  const {
    uploadTaskMinimized,
    selectedFiles,
    progress,
    currentUploadIndx,
  } = useUploadModalContext();

  return progress && (
    <DivCard
      className={cn(
        "w-full flex-col items-start justify-start gap-[10px]",
        uploadTaskMinimized ? "bg-app_white p-3 shadow-lg w-[min(90vw,_350px)] rounded-lg" : "",
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

      {
        progress[currentUploadIndx] ? (
          <ProgressBar
            progress_in_percentage={+progress[currentUploadIndx].toFixed(1)}
          />
        ) : (
          <ProgressBarShimmer />
        )
      }
    </DivCard >
  )
};

export { UploadProgress };
