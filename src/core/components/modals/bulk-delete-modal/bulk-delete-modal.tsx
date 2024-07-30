"use client";

import type { Document } from "@/core/interfaces/entities";

import { useMemo, useState } from "react";
import { TextTag, DivCard } from "@/components/atoms";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { deleteDocuments } from "@/core/config/firebase/fire-store";
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
import { useModalContext } from "@/providers/stores/context";

interface Props {
  selectedDocs: Document[];
}

export default function BulkDeleteModal({
  selectedDocs,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleRefetchDocs } = useDocStore();

  const { bulkDeleteDialogOpen, setBulkDeleteDialogOpen } = useModalContext();
  const { currentUser } = useUserStore();

  const selectedDocDetails = useMemo(() => {
    const num_files = selectedDocs.filter((doc) => doc.type === "FILE").length;
    const num_folders = selectedDocs.length - num_files;

    const total_bytes = selectedDocs.reduce(
      (acc, { capacity: { bytes } }) => acc + bytes,
      0
    );

    return {
      num_files,
      num_folders,
      total: selectedDocs.length,
      has_folders: num_folders > 0,
      capacity: getSizeFromBytes(total_bytes),
    };
  }, [selectedDocs]);

  const closeModal = () => {
    setBulkDeleteDialogOpen(false);
    setIsLoading(false);
  };

  const handleDeleteDocuments = async () => {
    if (selectedDocs.length <= 0) return;

    try {
      setIsLoading(true);

      const email = String(currentUser?.email);

      await deleteDocuments(email, selectedDocs);

      // I don't wanna use toggleRefetchDocs() just after deleting a single file or folder

      toggleRefetchDocs();
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      // toggleRefetchDocs();
    }
  };

  return (
    <Dialog
      open={isLoading ? true : bulkDeleteDialogOpen}
      onOpenChange={setBulkDeleteDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">Delete Selected</DialogTitle>
          <DialogDescription>
            Are you sure you want to the delete selected <br />

            {selectedDocDetails.has_folders ? (
              <TextTag className="text-left text-app_error">
                Folders detected. Deleting folders will delete their content
              </TextTag>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        <DivCard className="w-full flex-col items-start justify-start gap-3">
          <TextTag className="text-left">
            Files:
            <TextTag className="text-app_text_blue">
              {selectedDocDetails.num_files}
            </TextTag>
          </TextTag>

          <TextTag className="text-left">
            Folders:
            <TextTag className="text-app_text_blue">
              {selectedDocDetails.num_folders}
            </TextTag>
          </TextTag>

          <TextTag className="text-left">
            Size,{" "}
            {selectedDocDetails.has_folders ? (
              <TextTag className="text-left text-app_text_blue">
                Excluding sub folders
              </TextTag>
            ) : (
              ""
            )}
            :
            <TextTag className="text-app_text_blue">
              {selectedDocDetails.capacity.merged}
            </TextTag>
          </TextTag>
        </DivCard>

        <DialogFooter className="flex w-full items-center justify-end">
          <DialogClose asChild disabled={isLoading}>
            <Button className="w-fit outline-none" variant="error">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="blued"
            disabled={isLoading}
            onClick={handleDeleteDocuments}
            className="w-fit min-w-[100px]"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
