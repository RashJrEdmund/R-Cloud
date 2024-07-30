"use client";

import { useEffect, useCallback, useMemo } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import StyledFileFolderDisplay from "./styled-file-folder-display";
import { useDocStore, useAppStore, useSelectionStore } from "@/providers/stores/zustand";
import { useModalContext, useUploadModalContext } from "@/providers/stores/context";
import {
  GridFileCard,
  GridFolderCard,
  ListFileCard,
  ListFolderCard,
} from "./sub-components";
import { openFileUploadDialog } from "@/core/utils/helpers";

import type { DragEventHandler } from "react";
import FilesFolderShimmer from "./sub-components/files-folder-shimmer";
import MainAndTopSection from "./main-and-to-section-tag";
import { LoaderCircle } from "lucide-react";

interface Props {
  //
}

export default function FilesFolderDisplay({ }: Props) {
  const { documents, loadingDocs, currentFolder, loadingCurrentFolder } =
    useDocStore();
  const { displayLayout } = useAppStore();

  const { readyUploadModal } = useUploadModalContext();

  // DRAG_DROP_HANDLERS_STARTS_HERE!

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const { files, items } = e.dataTransfer;

    readyUploadModal(files, items);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  // DRAG_DROP_HANDLERS_ENDS_HERE!

  const handleFileUploadInputFieldData = useCallback<(e: Event) => void>(
    (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;
      readyUploadModal(files);
    },
    []
  );

  useEffect(() => {
    const fileUploadField =
      document.querySelector<HTMLInputElement>("#file-upload-field");

    if (!fileUploadField) return;

    fileUploadField.addEventListener(
      "change",
      handleFileUploadInputFieldData,
      false
    );

    return () => {
      fileUploadField.removeEventListener(
        "change",
        handleFileUploadInputFieldData,
        false
      );
      fileUploadField.value = "";
    };
  }, [handleFileUploadInputFieldData]);

  // return <FilesFolderShimmer displayLayout={displayLayout} />;

  return (
    <>
      <MainAndTopSection
        // bg='light'
        // className="min-h-[80vh] w-full flex-col justify-start bg-orange-400"
        // onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        <TextTag className="break-all text-app_text_grayed">
          {(() => {
            if (loadingCurrentFolder)
              return <LoaderCircle size={20} className="animate-spin" />;

            return currentFolder === "root" ? "root" : currentFolder.name;
          })()}
        </TextTag>

        {(function () {
          // anonymous component

          if (loadingDocs)
            return <FilesFolderShimmer displayLayout={displayLayout} />;

          if (!documents?.length)
            return (
              <DivCard className="min-h-[60vh] w-full">
                <TextTag
                  as="h3"
                  className="text-[2rem] font-semibold text-app_text_grayed"
                >
                  Folder Is Empty
                </TextTag>
              </DivCard>
            );

          return (
            <StyledFileFolderDisplay
              className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
            >
              {displayLayout === "GRID"
                ? documents.map((doc) =>
                  doc.type === "FOLDER" ? (
                    <GridFolderCard key={doc.id} doc={doc} />
                  ) : (
                    <GridFileCard key={doc.id} doc={doc} />
                  )
                )
                : documents.map((doc) =>
                  doc.type === "FOLDER" ? (
                    <ListFolderCard key={doc.id} doc={doc} />
                  ) : (
                    <ListFileCard key={doc.id} doc={doc} />
                  )
                )}
            </StyledFileFolderDisplay>
          );
        })()}
      </MainAndTopSection>
    </>
  );
}
