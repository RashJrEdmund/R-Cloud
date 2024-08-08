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
import { UserPlus } from "lucide-react";

interface Props {
  file: Document | null;
}

export default function ShareModal({ file }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { shareModalOpen, setShareModalOpen } = useModalContext();

  const { currentUser } = useUserStore();

  const closeModal = () => {
    setShareModalOpen(false);
    setIsLoading(false);
  };

  const handleEditDocument = async () => {
    // if (!docName.trim() || !currentUser) return;

    // if (docName === document?.name) return;

    // try {
    //   setIsLoading(true);

    //   await renameDocument(
    //     currentUser.email,
    //     String(document?.id),
    //     docName
    //   ).then(() => {
    //     // trying to reflect updates without toggling refetch.

    //     const update = documents?.map((doc) => {
    //       if (doc.id === document?.id)
    //         return {
    //           ...doc,
    //           name: docName,
    //         };

    //       return doc;
    //     });

    //     setDocuments(update as Document[]);
    //     toast("Update successful", {
    //       description: `Successfully renamed folder from ${document?.name} to ${docName}`,
    //     });
    //   });
    // } catch (error) {
    //   // console.warn(error);
    // } finally {
    //   closeModal();
    // }
  };

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    // handleEditDocument();
  };

  return (
    <Dialog
      open={isLoading ? true : shareModalOpen}
      onOpenChange={setShareModalOpen}
    >
      <DialogContent>
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">Share File</DialogTitle>
          <DialogDescription>
            File Name: {file?.name}
          </DialogDescription>
        </DialogHeader>

        <DivCard as="form" className="w-full flex-col items-start justify-start" onSubmit={handleFormSubmit}>
          <label htmlFor="search-email">
            <InputField
              leave_active
              id="search-email"
              placeholder={"search user email"}
              field_title={`recipient email`}
              field_name="document-name"
              // value={docName}
              // onValueChange={(e) => setDocName(e.target.value)}
              error={null}
            />
          </label>

          <UserPlus />
        </DivCard>

        {/* <DialogFooter className="flex w-full items-center justify-end">
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
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
