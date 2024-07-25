"use client";

import { useEffect, useCallback, useMemo } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import StyledFileFolderDisplay from "./styled-file-folder-display";
import { useDocStore, useAppStore } from "@/providers/stores/zustand";
import {
  useContextMenuContext,
  useModalContext,
} from "@/providers/stores/context";
import {
  GridFileCard,
  GridFolderCard,
  ListFileCard,
  ListFolderCard,
} from "./sub-components";
import {
  getResponsiveMenuPosition,
  openFileUploadDialog,
} from "@/core/utils/helpers";

import type { DragEventHandler, MouseEventHandler } from "react";
import type { ContextMenuContentType } from "@/core/interfaces/app";
import FilesFolderShimmer from "./sub-components/files-folder-shimmer";
import MainAndTopSection from "./main-and-to-section-tag";

interface Props {
  //
}

export default function FilesFolderDisplay({}: Props) {
  const { documents, currentFolder } = useDocStore();
  const { displayLayout } = useAppStore();

  const { readyUploadModal, openNewFolderModal, openBulkDeleteModal } =
    useModalContext();

  const {
    setContextCoordinates,
    setContextContent,
    contextMenuRef,

    selectionStart,
    selectedDocs,
    toggleDocumentSelection,
  } = useContextMenuContext();

  const callMenuFunctionThenCloseMenu = (call_back: Function) => {
    call_back();
    contextMenuRef?.current?.close();
  };

  // const CONTEXT_MENU_CONTENT: ContextMenuContentType[] = useMemo(
  //   () =>
  //     selectionStart
  //       ? [
  //           {
  //             text: "Delete Selected",
  //             icon_url: CONTEXT_MENU_ICONS.delete,
  //             action: () =>
  //               callMenuFunctionThenCloseMenu(() =>
  //                 openBulkDeleteModal(selectedDocs)
  //               ),
  //           },
  //           {
  //             text: "Stop Selection",
  //             icon_url: CONTEXT_MENU_ICONS.select,
  //             action: () =>
  //               callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
  //           },
  //         ]
  //       : [
  //           {
  //             text: "New Folder",
  //             icon_url: CONTEXT_MENU_ICONS.new_folder,
  //             action: () =>
  //               callMenuFunctionThenCloseMenu(() => openNewFolderModal()),
  //           },
  //           {
  //             text: "Upload File(s)",
  //             icon_url: CONTEXT_MENU_ICONS.upload,
  //             action: () =>
  //               callMenuFunctionThenCloseMenu(() => openFileUploadDialog()),
  //           },
  //           {
  //             text: "Start Selection",
  //             icon_url: CONTEXT_MENU_ICONS.select,
  //             action: () =>
  //               callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
  //           },
  //         ],
  //   [selectionStart, selectedDocs]
  // );

  // const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const coordinates = getResponsiveMenuPosition(e as unknown as MouseEvent);
  //   setContextCoordinates({
  //     top: coordinates.y + "px",
  //     left: coordinates.x + "px",
  //   });

  //   setContextContent(MAIN_CONTEXT_MENU_CONTENT);

  //   contextMenuRef?.current?.open();
  // };

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
          {currentFolder === "root" ? "root" : currentFolder.name}
        </TextTag>

        {documents ? (
          documents.length ? (
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
          ) : (
            <DivCard className="min-h-[60vh] w-full">
              <TextTag
                as="h3"
                className="text-[2rem] font-semibold text-app_text_grayed"
              >
                Folder Is Empty
              </TextTag>
            </DivCard>
          )
        ) : (
          <FilesFolderShimmer displayLayout={displayLayout} />
        )}
      </MainAndTopSection>
    </>
  );
}
