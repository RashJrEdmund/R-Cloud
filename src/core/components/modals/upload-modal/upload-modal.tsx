import { TextTag, DivCard } from "@/components/atoms";
import { ProgressBar, ProgressBarShimmer } from "@/components/molecules";
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

interface Props {
  //
}

export default function UploadModal({ }: Props) {
  const {
    uploadDialogOpen, setUploadDialogOpen,

    uploading,
    selectedFiles,

    uploadDetails,
    progress,
    currentUploadIndx,

    closeUploadModal,
    uploadFiles,
  } = useUploadModalContext();

  return (
    <Dialog
      open={uploading ? true : uploadDialogOpen}
      onOpenChange={setUploadDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">Upload new content</DialogTitle>
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
            ) : <ProgressBarShimmer />}
          </DivCard>
        )}

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
