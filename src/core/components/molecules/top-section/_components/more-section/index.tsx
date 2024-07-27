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
import Image from "next/image";

import type { ModalWrapperRef } from "@/components/modals/generics";
import type { ContextMenuContentType } from "@/core/interfaces/app";
import { MoreVertical } from "lucide-react";
import {
  BookmarkX,
  BoxSelectIcon,
  Folder,
  Trash2,
  Upload
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props {
  //
}

export default function MoreSection({ }: Props) {
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

  const MORE_CONTEXT_MENU_CONTENT = useMemo(
    () =>
      selectionStart
        ? [
          {
            text: "Delete Selected",
            icon: Trash2,
            action: () => "",
            // callMenuFunctionThenCloseMenu(() =>
            //   openBulkDeleteModal(selectedDocs)
            // ),
          },
          {
            text: "Stop Selection",
            icon: BookmarkX,
            // action: () =>
            //   callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
          },
        ]
        : [
          {
            text: "New Folder",
            icon: Folder,
            // action: () =>
            //   callMenuFunctionThenCloseMenu(() => openNewFolderModal()),
          },
          {
            text: "Upload File(s)",
            icon: Upload,
            // action: () =>
            //   callMenuFunctionThenCloseMenu(() => openFileUploadDialog()),
          },
          {
            text: "Start Selection",
            icon: BoxSelectIcon,
            // action: () =>
            //   callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
          },
        ],
    [selectionStart, selectedDocs]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <TextTag className="cursor-pointer" onClick={toggleModal}>
          <MoreVertical size={20} />

          More
        </TextTag>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-[10px] pb-8 w-fit min-w-[min(180px,_97vw)]">
        {
          MORE_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
            <DropdownMenuItem
              key={text}
              onClick={action}
              className="bg-app_bg lex items-center justify-start gap-2"
            >
              <Icon size={18} />

              {text}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
