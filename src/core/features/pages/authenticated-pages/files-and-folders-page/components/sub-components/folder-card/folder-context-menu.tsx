"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import type { Document } from "@/core/interfaces/entities";
import {
  useContextMenuStore,
  useModalContext,
} from "@/providers/stores/context";
import { FolderOpen, FolderPen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  doc: Document;
  children: React.ReactNode;
}

function FolderContextMenu({ doc: folder, children }: Props) {
  const router = useRouter();

  const { selectionStart } = useContextMenuStore();

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
      <ContextMenuTrigger className="h-fit w-full p-0">
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
