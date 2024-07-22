"use client";

import { useRef, useMemo, useState, MouseEventHandler } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import { ContextMenu } from "@/components/modals";
import {
  getResponsiveMenuPosition,
  openFileUploadDialog,
} from "@/core/utils/helpers";
import {
  useContextMenuContext,
  useModalContext,
} from "@/providers/stores/context";
import { CONTEXT_MENU_ICONS } from "@/core/ui/icons";
import Image from "next/image";

import type { ModalWrapperRef } from "@/components/modals/generics";
import type { ContextMenuContent } from "@/core/interfaces/app";

interface Props {
  //
}

export default function MoreSection({}: Props) {
  const contextMenuRef = useRef<ModalWrapperRef>(null);
  const [coordinates, setCoordinates] = useState<{ top: string; left: string }>(
    { top: "-10px", left: "-10px" }
  );

  const { openNewFolderModal, openBulkDeleteModal } = useModalContext();

  const {
    selectedDocs,

    selectionStart,
    toggleDocumentSelection,
  } = useContextMenuContext();

  const callMenuFunctionThenCloseMenu = (call_back: Function) => {
    call_back();
    contextMenuRef?.current?.close();
  };

  const toggleModal: MouseEventHandler<HTMLSpanElement> = (e) => {
    // contextMenuRef
    const xyCoord = getResponsiveMenuPosition(e as any as MouseEvent);
    if (contextMenuRef?.current?.isOpen) {
      contextMenuRef?.current?.close();
    } else {
      setCoordinates({
        top: "-10px",
        left: (-1 * xyCoord.extra_x || 10) + "px",
      });
      contextMenuRef?.current?.open();
    }
  };

  const MORE_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(
    () =>
      selectionStart
        ? [
            {
              text: "Delete Selected",
              icon_url: CONTEXT_MENU_ICONS.delete,
              action: () =>
                callMenuFunctionThenCloseMenu(() =>
                  openBulkDeleteModal(selectedDocs)
                ),
            },
            {
              text: "Stop Selection",
              icon_url: CONTEXT_MENU_ICONS.select,
              action: () =>
                callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
            },
          ]
        : [
            {
              text: "New Folder",
              icon_url: CONTEXT_MENU_ICONS.new_folder,
              action: () =>
                callMenuFunctionThenCloseMenu(() => openNewFolderModal()),
            },
            {
              text: "Upload File(s)",
              icon_url: CONTEXT_MENU_ICONS.upload,
              action: () =>
                callMenuFunctionThenCloseMenu(() => openFileUploadDialog()),
            },
            {
              text: "Start Selection",
              icon_url: CONTEXT_MENU_ICONS.select,
              action: () =>
                callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
            },
          ],
    [selectionStart, selectedDocs]
  ); // selectionStart is required especially for the start and stop selection option

  return (
    <DivCard className="relative">
      {" "}
      {/* This relative positioning is for the ContextMenu */}
      <TextTag className="cursor-pointer" onClick={toggleModal}>
        <Image
          src={CONTEXT_MENU_ICONS.more}
          alt="Show more"
          className="cursor-pointer"
          height={24}
          width={24}
        />
        More
      </TextTag>
      <ContextMenu
        top={coordinates.top}
        left={coordinates.left}
        ref={contextMenuRef}
        content={MORE_CONTEXT_MENU_CONTENT}
      />
    </DivCard>
  );
}
