"use client";
import type { Document } from "@/core/interfaces/entities";

import { useMemo, useState } from "react";
import { TextTag, DivCard } from "@/components/atoms";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { deleteFiles, deleteFolders } from "@/core/config/firebase/fire-store";

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
  document: Document | null;
}

export default function DeleteModal({ document }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { deleteDialogOpen, setDeleteDialogOpen } = useModalContext();
  const { currentUser } = useUserStore();

  const doc_type = useMemo(
    () => (document?.type === "FOLDER" ? "Folder" : "File"),
    [document?.type]
  );

  const closeModal = () => {
    setDeleteDialogOpen(false);
    setIsLoading(false);
  };

  const handleDeleteDocument = async () => {
    if (!document) return;

    try {
      setIsLoading(true);

      const email = String(currentUser?.email);

      if (document.type === "FILE") {
        await deleteFiles(email, [document]);
      } else {
        await deleteFolders(email, [document]);
      }

      // I don't wanna use toggleRefetchDocs() just after deleting a single file or folder

      const update_docs = (documents as Document[]).filter(
        (doc) => doc.id !== document.id
      );

      setDocuments(update_docs);
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isLoading ? true : deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <input
            placeholder="Don't mind me, I'm just here to catch the auto focus on this modal"
            hidden
          />

          <DialogTitle className="text-app_text">Delete {doc_type}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {doc_type} <br />
            {document?.type === "FOLDER" &&
            Number(document?.capacity.bytes) > 0 ? (
              <TextTag className="text-left text-app_error">
                Deleting this folder will delete all it&apos;s content
              </TextTag>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        <DivCard className="w-full flex-col items-start justify-start gap-3">
          <TextTag className="text-left">
            name:
            <TextTag className="text-app_text_blue">{document?.name}</TextTag>
          </TextTag>

          {document?.type === "FILE" ? (
            <TextTag className="text-left">
              size:
              <TextTag className="text-left text-app_text_blue">
                {document?.capacity.size}
              </TextTag>
            </TextTag>
          ) : (
            <TextTag className="text-left">
              Capacity:
              <TextTag className="text-app_text_blue">
                {Number(document?.capacity.bytes) <= 0
                  ? "Empty"
                  : document?.capacity.size}
              </TextTag>
            </TextTag>
          )}
        </DivCard>

        <DialogFooter className="flex w-full items-center justify-end">
          <DialogClose asChild disabled={isLoading} className="outline-none">
            <Button className="w-fit outline-none" variant="error">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="blued"
            disabled={isLoading}
            onClick={handleDeleteDocument}
            className="w-fit min-w-[100px]"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
