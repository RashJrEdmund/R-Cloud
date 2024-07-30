"use client";

import type { Document } from "@/core/interfaces/entities";

import { useMemo } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useModalContext } from "@/providers/stores/context";
import { useAppStore, useSelectionStore } from "@/providers/stores/zustand";
import { SquareCheckBig, FolderOpen, FolderPen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/core/lib/utils";

interface Props {
  doc: Document;
  children: React.ReactNode;
  // handleOpen: () => void;
}

function FolderContextMenu({ doc: folder, children }: Props) {
  const router = useRouter();

  const { selectionStart, handleDocumentSelection } = useSelectionStore();
  const { displayLayout } = useAppStore();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const handleOpen = () => {
    if (selectionStart) return; // to prevent opening folders when selection has started

    router.push("/r-drive/root/" + folder.id);
  };

  const FOLDER_CONTEXT_MENU_CONTENT = useMemo(
    () => {
      const _data = [
        {
          text: "Open Folder",
          icon: FolderOpen,
          action: handleOpen,
        },
        {
          text: "Rename Folder",
          icon: FolderPen,
          action: () => openEditDocumentModal(folder),
        },
        {
          text: "Delete Folder",
          icon: Trash2,
          action: () => openDeleteDocumentModal(folder),
        },
      ];

      if (selectionStart) return _data;

      _data.splice(2, 0, {
        text: "Selection Folder",
        icon: SquareCheckBig,
        action: () => handleDocumentSelection(folder),
      });

      return _data;
    },
    [selectionStart]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn("h-fit p-0", displayLayout === "GRID" ? "w-full md:w-fit mx-auto" : "w-full")}>
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-fit min-w-[min(180px,_97vw)] p-[10px] pb-8">
        {FOLDER_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
          <ContextMenuItem
            key={text}
            onClick={action}
            className="lex items-center justify-start gap-2 bg-app_bg"
          >
            <Icon size={18} />

            {text}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { FolderContextMenu };
