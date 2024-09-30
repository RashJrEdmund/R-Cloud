"use client";

import { useShareModalStore, useUserStore } from "@/providers/stores/zustand";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { removeAllSharedAccess } from "@/core/config/firebase/fire-store";
import { toast } from "sonner";
import { ClearAllAccessBtn } from "./clear-all-access-btn";

interface Props {
  handleShareFile: () => void;
  handleModalClose: (open: boolean) => void;
  reflectDocSharedStateToUi: (_: { isShared: boolean }) => void;
}

export default function ShareModalFooter({
  handleShareFile,
  handleModalClose,
  reflectDocSharedStateToUi,
}: Props) {
  const {
    fileToBeShared,
    accessType,

    searching,
    userEmails,

    isSharing,
    setIsSharing,

    copyFileShareLink,
  } = useShareModalStore();

  const { currentUser } = useUserStore();

  const handleClearAllAccess = () => {
    setIsSharing(true);

    removeAllSharedAccess(currentUser!.email, fileToBeShared!.id)
      .then((msg) => {
        toast(msg);
        reflectDocSharedStateToUi({ isShared: false });
        handleModalClose(false);
      })
      .catch(() => {
        toast.error("Something went wrong", {
          description: "please try again",
        });
      })
      .finally(() => {
        setIsSharing(false);
      });
  };

  return (
    <DialogFooter className="flex w-full items-center justify-end">
      {fileToBeShared?.sharedState?.isShared ? (
        <ClearAllAccessBtn
          isSharing={isSharing}
          searching={searching}
          handleClearAllAccess={handleClearAllAccess}
        />
      ) : null}

      {fileToBeShared?.sharedState?.isShared ? (
        <Button
          disabled={isSharing || searching}
          onClick={() =>
            copyFileShareLink(
              fileToBeShared!,
              fileToBeShared?.sharedState?.accessType === "PUBLIC"
            )
          }
          className="outline-none sm:w-fit"
        >
          Copy Link
        </Button>
      ) : null}

      <Button
        variant="blued"
        disabled={
          isSharing ||
          searching ||
          (!userEmails.length && accessType === "RESTRICTED")
        }
        onClick={handleShareFile}
        className="min-w-[100px] sm:w-fit"
      >
        {isSharing ? "Sharing..." : "Done"}
      </Button>
    </DialogFooter>
  );
}
