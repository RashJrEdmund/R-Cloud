"use client";

import type { FormEventHandler } from "react";
import type { Document } from "@/core/interfaces/entities";

import { useState } from "react";
import { DivCard } from "@/components/atoms";
import { InputField } from "@/components/molecules";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { useParams } from "next/navigation";
import {
  createFileDoc,
  updateFolderSize,
} from "@/core/config/firebase/fire-store";
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
  //
};

export default function NewFolderModal({}: Props) {
  const [folderName, setFolderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { newFolderDialogOpen, setNewFolderDialogOpen } = useModalContext();

  const { toggleRefetchDocs, currentFolder } = useDocStore();

  const { currentUser } = useUserStore();

  const params = useParams<{ folder_id: string }>();

  const closeModal = () => {
    setNewFolderDialogOpen(false);
    setIsLoading(false);
  };

  const uploadFolder = async () => {
    if (!folderName.trim() || !currentUser) return;

    try {
      setIsLoading(true);

      const ancestor_ids =
        currentFolder === "root"
          ? ["root"]
          : [...currentFolder.ancestor_ids, currentFolder.id]; // inheriting the parent's ancestor ids and the parent's own id

      const new_folder: Omit<Document, "id"> = {
        user_id: currentUser.id,
        name: folderName,
        parent_id: params.folder_id || "root",
        ancestor_ids,
        type: "FOLDER",
        content_type: null,
        download_url: null,
        filename: null,
        extension: null,
        capacity: {
          size: "0 Bytes",
          bytes: 0,
          length: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createFileDoc(currentUser.email, new_folder as Document);

      if (params.folder_id) {
        await updateFolderSize(currentUser.email, params.folder_id, {
          bytes: 0,
          length: 1,
        });
      }
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      toggleRefetchDocs();
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    uploadFolder();
  };

  return (
    <Dialog
      open={isLoading ? true : newFolderDialogOpen}
      onOpenChange={setNewFolderDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">New Folder</DialogTitle>
          <DialogDescription>Create new empty folder.</DialogDescription>
        </DialogHeader>

        <DivCard
          as="form"
          className="w-full"
          onSubmit={handleFormSubmit}
        >
          <InputField
            leave_active
            placeholder="New Folder"
            field_title="Folder name"
            field_name="folder-name"
            value={folderName}
            onValueChange={(e) => setFolderName(e.target.value)}
            error={null}
          />
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
            onClick={uploadFolder}
            className="w-fit min-w-[100px]"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
