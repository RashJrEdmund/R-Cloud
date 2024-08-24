"use client";

import { useState } from "react";
import { useDocStore, useShareModalStore, useUserStore } from "@/providers/stores/zustand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ViewPermissions, UserEmailS, ShareModalFooter } from "./components";
import { SharedDocument } from "@/core/interfaces/entities";
import { shareDocument } from "@/core/config/firebase/fire-store";
import { toast } from "sonner";

interface Props {
  //
}

export default function ShareModal({ }: Props) {
  const { currentUser } = useUserStore();

  const { documents, setDocuments } = useDocStore();

  const {
    fileToBeShared,
    accessType,
    viewerRole,
    searching,
    userEmails,

    isSharing, setIsSharing,

    shareModalOpen,
    setShareModalOpen,
    cleanUpFunction,
  } = useShareModalStore();

  const handleModalClose = (open: boolean) => {
    if (!open) {
      cleanUpFunction();
      // meaning trying to close modal
      setShareModalOpen(false);
      return;
    }

    setShareModalOpen(true);
  };

  const reflectDocSharedStateToUi = ({ isShared }: { isShared: boolean }) => {
    const updateDocs = documents.map((doc) => {
      if (doc.id !== fileToBeShared!.id) return doc;

      const _update = { ...doc, sharedState: doc?.sharedState || {} };

      _update.sharedState.isShared = isShared;
      _update.sharedState.accessType = accessType;
      _update.sharedState.viewerRole = viewerRole;

      return _update;
    });

    // console.log(updateDocs);

    setDocuments(updateDocs);
  };

  const handleShareFile = () => {
    setIsSharing(true);

    const date = new Date().toISOString();

    const sharedDocument: SharedDocument = {
      doc_id: fileToBeShared!.id,
      type: "FILE",
      download_url: fileToBeShared!.download_url!,
      name: fileToBeShared!.name,
      extension: fileToBeShared!.extension!,
      content_type: fileToBeShared!.content_type!,
      capacity: {
        size: fileToBeShared!.capacity.size,
        bytes: fileToBeShared!.capacity.bytes,
      },
      shared_by: currentUser!.email,
      accessType,
      viewerRole,
      sharedWith: [...userEmails],
      firstSharedAt: fileToBeShared!.sharedState?.firstSharedAt || date,
      lastModified: date,
    };

    shareDocument(sharedDocument, fileToBeShared!)
      .then((msg) => {
        // console.log(msg);
        toast(msg);
        reflectDocSharedStateToUi({ isShared: true });

        handleModalClose(false);
      }).catch((err) => {
        toast.error("Something went wrong", { description: "please try again" });

        // console.warn(err);
      })
      .finally(() => {
        setIsSharing(false);
      });
  };

  return (
    <Dialog
      open={isSharing || searching ? true : shareModalOpen}
      onOpenChange={handleModalClose}
    >
      <DialogContent className="w-primary_app_width">
        <DialogHeader className="w-full">
          <DialogTitle className="text-app_text">
            Share: {fileToBeShared?.name}
          </DialogTitle>
        </DialogHeader>

        <ViewPermissions />

        <UserEmailS />

        <ShareModalFooter
          handleShareFile={handleShareFile}
          handleModalClose={handleModalClose}
          reflectDocSharedStateToUi={reflectDocSharedStateToUi}
        />
      </DialogContent>
    </Dialog>
  );
}
