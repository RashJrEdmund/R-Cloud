import { AppModalWrapper } from "@/components/modals/generics";
import { TextTag, DivCard } from "@/components/atoms";
import { ProgressBar } from "@/components/molecules";
import { getSizeFromBytes } from "@/core/utils/file-utils";

import type { MutableRefObject } from "react";
import type { ModalWrapperRef } from "@/components/modals/generics";

interface Props {
  uploadModalRef: MutableRefObject<ModalWrapperRef | undefined>;
  isLoading: boolean;

  selectedFiles: File[];
  uploadDetails: {
    total_size: number;
    count: number;
  } | null;

  progress: { [key: number]: number } | null;
  currentUploadIndx: number;

  closeModal: () => void;

  uploadFiles: () => Promise<void>;
}

export default function UploadModal({
  uploadModalRef,
  isLoading,
  selectedFiles,

  uploadDetails,
  progress,
  currentUploadIndx,

  closeModal,
  uploadFiles,
}: Props) {
  return (
    <AppModalWrapper
      ref={uploadModalRef as MutableRefObject<ModalWrapperRef>}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      cancelAction={closeModal}
      confirmAction={uploadFiles}
    >
      <TextTag>
        You&apos;ve selected
        <TextTag className="text-app_text_blue">
          {selectedFiles.length} file{selectedFiles.length > 0 ? "s" : ""}
        </TextTag>
      </TextTag>

      <TextTag>
        Total upload size{" "}
        <TextTag className="text-app_text_blue">
          {getSizeFromBytes(Number(uploadDetails?.total_size ?? 0)).merged}
        </TextTag>
      </TextTag>

      {progress && (
        <DivCard className="w-full flex-col items-start justify-start gap-[10px]">
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
          ) : null}
        </DivCard>
      )}
    </AppModalWrapper>
  );
}
