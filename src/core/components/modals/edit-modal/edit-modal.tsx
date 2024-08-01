"use client";

import type { FormEventHandler } from "react";
import type { Document } from "@/core/interfaces/entities";

import { useMemo, useEffect, useState } from "react";
import { DivCard } from "@/components/atoms";
import { InputField } from "@/components/molecules";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { renameDocument } from "@/core/config/firebase/fire-store";
import { toast } from "sonner";
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

export default function EditModal({ document }: Props) {
  const [docName, setDocName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { editDialogOpen, setEditDialogOpen } = useModalContext();

  const { currentUser } = useUserStore();

  const doc_type = useMemo(
    () => (document?.type === "FOLDER" ? "Folder" : "File"),
    [document?.type]
  );

  const closeModal = () => {
    setEditDialogOpen(false);
    setIsLoading(false);
  };

  const handleEditDocument = async () => {
    if (!docName.trim() || !currentUser) return;

    if (docName === document?.name) return;

    try {
      setIsLoading(true);

      await renameDocument(
        currentUser.email,
        String(document?.id),
        docName
      ).then(() => {
        // trying to reflect updates without toggling refetch.

        const update = documents?.map((doc) => {
          if (doc.id === document?.id)
            return {
              ...doc,
              name: docName,
            };

          return doc;
        });

        setDocuments(update as Document[]);
        toast("Update successful", {
          description: `Successfully renamed folder from ${document?.name} to ${docName}`,
        });
      });
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    handleEditDocument();
  };

  useEffect(() => {
    if (document) setDocName(document.name);
  }, [document]);

  return (
    <Dialog
      open={isLoading ? true : editDialogOpen}
      onOpenChange={setEditDialogOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">Rename {doc_type}</DialogTitle>
        </DialogHeader>

        <DivCard as="form" className="w-full" onSubmit={handleFormSubmit}>
          <InputField
            leave_active
            placeholder={"re name " + doc_type}
            field_title={`${doc_type} name`}
            field_name="document-name"
            value={docName}
            onValueChange={(e) => setDocName(e.target.value)}
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
            onClick={handleEditDocument}
            className="w-fit min-w-[100px]"
          >
            {isLoading ? "Editing..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
