"use client";

import { useState } from "react";
import { AppModalWrapper } from "@/components/modals/generics";
import { TextTag, DivCard } from "@/components/atoms";
import { InputField } from "@/components/molecules";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { useParams } from "next/navigation";
import {
  createFileDoc,
  updateFolderSize,
} from "@/core/config/firebase/fire-store";

import type { MutableRefObject, FormEventHandler } from "react";
import type { ModalWrapperRef } from "@/components/modals/generics";
import type { Document } from "@/core/interfaces/entities";

interface Props {
  folderModalRef: MutableRefObject<ModalWrapperRef | undefined>;
}

export default function NewFolderModal({ folderModalRef }: Props) {
  const [folderName, setFolderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toggleRefetchPath, currentFolder } = useDocStore();

  const { currentUser } = useUserStore();

  const params = useParams<{ folder_id: string }>();

  const closeModal = () => {
    folderModalRef.current?.close();
    setIsLoading(false);
  };

  const uploadFolder: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

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
      toggleRefetchPath();
    }
  };

  return (
    <AppModalWrapper
      ref={folderModalRef as any}
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg="Create"
      loadingMsg="Creating..."
      cancelAction={closeModal}
      confirmAction={uploadFolder}
    >
      <DivCard
        as="form"
        className="w-full flex-col items-start justify-start gap-[10px]"
        onSubmit={uploadFolder}
      >
        <TextTag>New Folder</TextTag>

        <InputField
          leave_active
          field_title="Folder name"
          field_name="folder-name"
          value={folderName}
          onValueChange={(e) => setFolderName(e.target.value)}
          error={null}
        />
      </DivCard>
    </AppModalWrapper>
  );
}
