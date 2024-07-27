"use client";

import { useMemo, useState } from "react";
import { AppModalWrapper } from "@/components/modals/generics";
import { TextTag, DivCard } from "@/components/atoms";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { deleteFiles, deleteFolders } from "@/core/config/firebase/fire-store";

import type { MutableRefObject } from "react";
import type { ModalWrapperRef } from "@/components/modals/generics";
import type { Document } from "@/core/interfaces/entities";

interface Props {
  deleteModalRef: MutableRefObject<ModalWrapperRef | undefined>;
  document: Document | null;
}

export default function DeleteModal({ deleteModalRef, document }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { currentUser } = useUserStore();

  const doc_type = useMemo(
    () => (document?.type === "FOLDER" ? "Folder" : "File"),
    [document?.type]
  );

  const closeModal = () => {
    deleteModalRef.current?.close();
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
      // toggleRefetchDocs();
    }
  };

  return (
    <AppModalWrapper
      ref={deleteModalRef as MutableRefObject<ModalWrapperRef>}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg="Delete"
      loadingMsg="Deleting..."
      cancelAction={closeModal}
      confirmAction={handleDeleteDocument}
    >
      <DivCard className="w-full flex-col items-start justify-start gap-3">
        <TextTag className="text-left">
          Are you sure you want to delete this {doc_type}
        </TextTag>

        {document?.type === "FOLDER" && Number(document?.capacity.bytes) > 0 ? (
          <TextTag className="text-left text-app_error">
            Deleting this folder will delete all it&apos;s content
          </TextTag>
        ) : null}

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
    </AppModalWrapper>
  );
}
