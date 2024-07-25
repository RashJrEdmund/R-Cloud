"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import type { Document } from "@/core/interfaces/entities";
import { useContextMenuContext, useModalContext } from "@/providers/stores/context";
import { FolderOpen, FolderPen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  doc: Document;
  children: React.ReactNode;
}

function FolderContextMenu({ doc: folder, children }: Props) {
  const router = useRouter();

  const {
    selectionStart,
  } = useContextMenuContext();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const handleOpen = () => {
    if (selectionStart) return; // to prevent opening folders when selection has started

    router.push("/r-drive/root/" + folder.id);
  };

  const FOLDER_CONTEXT_MENU_CONTENT = useMemo(
    () => [
      {
        text: "Open Folder",
        icon: FolderOpen,
        action: handleOpen,
      },
      {
        text: "Rename Folder",
        icon: FolderPen,
        // action: () => openEditDocumentModal(folder),
      },
      {
        text: "Delete Folder",
        icon: Trash2,
        // action: () => openDeleteDocumentModal(folder),
      },
    ],
    [selectionStart]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-fit p-0 w-full">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="p-[10px] pb-8 w-fit min-w-[min(180px,_97vw)]">
        {
          FOLDER_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
            <ContextMenuItem
              key={text}
              onClick={action}
              className="bg-app_bg lex items-center justify-start gap-2"
            >
              <Icon size={18} />

              {text}
            </ContextMenuItem>
          ))
        }
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { FolderContextMenu };
