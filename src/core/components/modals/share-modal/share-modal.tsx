"use client";

import { useState } from "react";
import { useShareModalStore } from "@/providers/stores/zustand";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ViewPermissions } from "./components";
import UserEmailS from "./components/view-permissions/user-emails";

interface Props {
  //
}

export default function ShareModal({ }: Props) {
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const {
    fileToBeShared,
    accessType,
    viewerRole,

    shareModalOpen,
    setShareModalOpen,
    copyFileShareLink,
    cleanUpFunction,
  } = useShareModalStore();

  const handleModalClose = (open: boolean) => {
    if (!open) {
      cleanUpFunction();
      // meaning trying to close modal
      setIsSharing(false);
      setShareModalOpen(false);
      return;
    }

    setShareModalOpen(true);
  };

  const handleShareFile = async () => {
    //
  };

  return (
    <Dialog
      open={isSharing ? true : shareModalOpen}
      onOpenChange={handleModalClose}
    >
      <DialogContent className="w-primary_app_width">
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">
            Share: {fileToBeShared?.name}
          </DialogTitle>
        </DialogHeader>

        <ViewPermissions />

        <UserEmailS
          isSharing={isSharing}
          handleShareFile={handleShareFile}
        />

        <DialogFooter className="flex w-full items-center justify-end">
          <Button
            disabled={isSharing}
            onClick={() => copyFileShareLink(fileToBeShared!)}
            className="outline-none sm:w-fit"
          >
            Copy Link
          </Button>

          <Button
            variant="blued"
            disabled={isSharing}
            onClick={handleShareFile}
            className="min-w-[100px] sm:w-fit"
          >
            {isSharing ? "Updating..." : "Done"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
