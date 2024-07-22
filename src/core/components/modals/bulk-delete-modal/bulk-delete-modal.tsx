"use client";

import { useMemo, useState } from "react";
import { AppModalWrapper } from "@/components/modals/generics";
import { TextTag, DivCard } from "@/components/atoms";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { deleteDocuments } from "@/core/config/firebase/fire-store";
import { getSizeFromBytes } from "@/core/utils/file-utils";

import type { MutableRefObject } from "react";
import type { ModalWrapperRef } from "@/components/modals/generics";
import type { Document } from "@/core/interfaces/entities";

interface Props {
  bulkDeleteModalRef: MutableRefObject<ModalWrapperRef | undefined>;
  selectedDocs: Document[];
}

export default function BulkDeleteModal({
  bulkDeleteModalRef,
  selectedDocs,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleRefetchPath } = useDocStore();

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
    bulkDeleteModalRef.current?.close();
    setIsLoading(false);
  };

  const handleDeleteDocuments = async () => {
    if (selectedDocs.length <= 0) return;

    try {
      setIsLoading(true);

      const email = String(currentUser?.email);

      await deleteDocuments(email, selectedDocs);

      // I don't wanna use toggleRefetchPath() just after deleting a single file or folder

      toggleRefetchPath();
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      // toggleRefetchPath();
    }
  };

  return (
    <AppModalWrapper
      ref={bulkDeleteModalRef as MutableRefObject<ModalWrapperRef>}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg="Delete"
      loadingMsg="Deleting..."
      cancelAction={closeModal}
      confirmAction={handleDeleteDocuments}
    >
      <DivCard className="w-full flex-col items-start justify-start gap-3">
        <TextTag className="text-left">
          Are you sure you want to the delete selected
        </TextTag>

        {selectedDocDetails.has_folders ? (
          <TextTag className="text-left text-app_error">
            Folders detected. Deleting folders will delete their content
          </TextTag>
        ) : null}

        <TextTag className="text-left">
          Files:
          <TextTag className="text-app_text_blue">{selectedDocDetails.num_files}</TextTag>
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
    </AppModalWrapper>
  );
}
