"use client";

import type { Document } from "@/core/interfaces/entities";

import { useMemo } from "react";
import { useModalContext } from "@/providers/stores/context";
import { useAppStore, useSelectionStore } from "@/providers/stores/zustand";
import { BookOpen, SquareCheckBig, Copy, Edit, Trash2, Upload } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/core/lib/utils";

interface Props {
  doc: Document;
  children: React.ReactNode;
  // handleOpen: () => void;
}

function FileContextMenu({ doc: file, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { displayLayout } = useAppStore();
  const { selectionStart, handleDocumentSelection } = useSelectionStore();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const handleOpen = () => {
    if (selectionStart) return; // to prevent opening folders when selection has started

    router.push(`${pathname}?viewing=${file.id}`);
  };

  const FILE_CONTEXT_MENU_CONTENT = useMemo(
    () => {
      const _data = [
        {
          text: "Open File",
          icon: BookOpen,
          action: handleOpen,
        },
        {
          text: "Rename File",
          icon: Edit,
          action: () => openEditDocumentModal(file),
        },
        {
          text: "New File",
          icon: Upload,
          // action: openFileUploadDialog,
        },
        {
          text: "Copy File",
          icon: Copy,
          action: () => null,
        },
        {
          text: "Delete File",
          icon: Trash2,
          action: () => openDeleteDocumentModal(file),
        },
      ];

      if (selectionStart) return _data;

      _data.splice(2, 0, {
        text: "Selection File",
        icon: SquareCheckBig,
        action: () => handleDocumentSelection(file),
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
        {FILE_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
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

export { FileContextMenu };
