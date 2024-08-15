"use client";

import type { FormEventHandler } from "react";
import type { Document } from "@/core/interfaces/entities";

import { useMemo, useEffect, useState } from "react";
import { DivCard, TextTag } from "@/components/atoms";
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
import { Globe, Lock, UserPlus, Users, X } from "lucide-react";
import { ViewPermissions } from "./components";

interface Props {
  file: Document | null;
}

export default function ShareModal({ file }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmails, setUserEmails] = useState<string[]>([
    "rash@gmail.com",
    "arreyetta@gmail.com",
    "orashusedmund@gmail.com",
    "testuser@gmail.com",
    "malone@gmail.com",
    "mesmer@gmail.com",
    "alaric@gmail.com",
    "mr_gaston@gmail.com",
  ]);

  const { documents, setDocuments } = useDocStore();

  const { shareModalOpen, setShareModalOpen, copyFileShareLink } = useModalContext();

  const { currentUser } = useUserStore();

  const handleModalClose = (open: boolean) => {
    if (!open) {
      // meaning trying to close modal
      setIsLoading(false);
      setShareModalOpen(false);
      return;
    }

    setShareModalOpen(true);
  };

  const removeEmail = (email: string) => {
    setUserEmails((prev) => prev.filter(eml => eml !== email));
  }

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
      onOpenChange={handleModalClose}
    >
      <DialogContent className="w-primary_app_width">
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">Share: {file?.name}</DialogTitle>
          {/* <DialogDescription>
            File Name: {file?.name}
          </DialogDescription> */}
        </DialogHeader>

        <ViewPermissions />

        <DivCard as="form" className="w-full items-center justify-start gap-2" onSubmit={handleFormSubmit}>
          <label htmlFor="search-email" className="w-full">
            <InputField
              leave_active
              id="search-email"
              placeholder="recipient email"
              field_title="add users"
              field_name="add-users-name"
              // value={docName}
              // onValueChange={(e) => setDocName(e.target.value)}
              error={null}
            />
          </label>

          <Button asChild type="submit" className="w-fit cursor-pointer">
            <UserPlus size={30} className="size-[30px]" />
          </Button>
        </DivCard>

        <DivCard className="w-full flex-col justify-start gap-2 h-fit min-h-[100px] max-h-[200px] md:max-h-[300px] py-2 px-1 sm:py-3 overflow-y-auto rounded-sm border border-app_bg_light">
          {
            userEmails.length ? userEmails?.map((email) => (
              <DivCard key={email} className="w-full justify-between bg-app_bg rounded-sm shadow p-2 border border-app_bg_light">
                <TextTag className="text-app_text_grayed">
                  {email}
                </TextTag>

                <X size={20} className="cursor-pointer hover:text-app_error" onClick={() => removeEmail(email)} />
              </DivCard>
            )) : (
              <TextTag className="text-app_text_grayed text-center">
                search and add users to grant access
              </TextTag>
            )
          }
        </DivCard>

        <DialogFooter className="flex w-full items-center justify-end">
          <Button
            disabled={isLoading}
            onClick={() => copyFileShareLink(file!)}
            className="sm:w-fit outline-none"
          >
            Copy Link
          </Button>

          <Button
            variant="blued"
            disabled={isLoading}
            onClick={handleEditDocument}
            className="sm:w-fit min-w-[100px]"
          >
            {isLoading ? "Updating..." : "Done"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
