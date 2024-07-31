"use client";

import { useMemo } from "react";
import { TextTag } from "@/components/atoms";
import {
  openFileUploadDialog,
} from "@/core/utils/helpers";
import { useModalContext } from "@/providers/stores/context";
import { useSelectionStore } from "@/providers/stores/zustand";
import { MoreVertical } from "lucide-react";
import { BoxSelectIcon, SquareCheckBig, Folder, Trash2, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  //
};

export default function MoreSection({ }: Props) {
  const { setNewFolderDialogOpen, setBulkDeleteDialogOpen } = useModalContext();

  const {
    selectedDocs,

    selectionStart,
    toggleDocumentSelection,
  } = useSelectionStore();

  const MORE_CONTEXT_MENU_CONTENT = useMemo(
    () =>
      selectionStart
        ? [
          {
            text: "Delete Selected",
            icon: Trash2,
            action: () => setBulkDeleteDialogOpen(!!selectedDocs.length),
          },
          {
            text: "Stop Selection",
            icon: BoxSelectIcon,
            action: toggleDocumentSelection,
          },
        ]
        : [
          {
            text: "New Folder",
            icon: Folder,
            action: () => setNewFolderDialogOpen(true),
          },
          {
            text: "Upload File(s)",
            icon: Upload,
            // action: () =>
            //   callMenuFunctionThenCloseMenu(() => openFileUploadDialog()),
          },
          {
            text: "Start Selection",
            icon: SquareCheckBig,
            action: toggleDocumentSelection,
          },
        ],
    [selectionStart, selectedDocs]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <TextTag className="cursor-pointer">
          <MoreVertical size={20} />
          More
        </TextTag>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit min-w-[min(180px,_97vw)] p-[10px] pb-8">
        {MORE_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
          <DropdownMenuItem
            key={text}
            onClick={action}
            className="lex items-center justify-start gap-2 bg-app_bg"
          >
            <Icon size={18} />

            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
