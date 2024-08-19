import { TextTag } from "@/components/atoms";
import { getSizeFromBytes } from "@/core/utils/file-utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadModalContext } from "@/providers/stores/context";
import { useMemo } from "react";
import { UploadProgress } from "./upload-progress";

interface Props {
  //
}

export default function UploadModal({}: Props) {
  const {
    uploadDialogOpen,
    setUploadDialogOpen,

    uploadTaskMinimized,
    minimizeTask,

    uploading,
    selectedFiles,

    uploadDetails,
    progress,
    currentUploadIndx,

    closeUploadModal,
    uploadFiles,
  } = useUploadModalContext();

  const isDialogOpened = useMemo(() => {
    if (uploadTaskMinimized) return false;

    if (uploading) return true;

    return uploadDialogOpen;
  }, [uploadTaskMinimized, uploading, uploadDialogOpen]);

  return (
    <Dialog open={isDialogOpened} onOpenChange={setUploadDialogOpen}>
      <DialogContent showMinimizeBtn={!!progress} onMinimize={minimizeTask}>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">
            Upload new content
          </DialogTitle>

          <DialogDescription>
            You&apos;ve selected
            <TextTag className="text-app_text_blue">
              {selectedFiles.length} file{selectedFiles.length > 0 ? "s" : ""}
            </TextTag>
            <br />
            Total upload size{" "}
            <TextTag className="text-app_text_blue">
              {getSizeFromBytes(Number(uploadDetails?.total_size ?? 0)).merged}
            </TextTag>
          </DialogDescription>
        </DialogHeader>

        <UploadProgress />

        <DialogFooter className="flex w-full items-center justify-end">
          <DialogClose asChild disabled={uploading}>
            <Button className="w-fit outline-none" variant="error">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="blued"
            disabled={uploading}
            onClick={uploadFiles}
            className="w-fit min-w-[100px]"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
