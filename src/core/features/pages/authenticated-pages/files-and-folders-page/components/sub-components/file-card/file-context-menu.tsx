"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import type { Document } from "@/core/interfaces/entities";
import { useContextMenuContext, useModalContext } from "@/providers/stores/context";
import { BookOpen, Copy, Edit, Trash2, Upload } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  doc: Document;
  children: React.ReactNode;
}

function FileContextMenu({ doc: file, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    selectionStart,
  } = useContextMenuContext();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const handleOpen = () => {
    if (selectionStart) return; // to prevent opening folders when selection has started

    router.push(`${pathname}?viewing=${file.id}`);
  };

  const FILE_CONTEXT_MENU_CONTENT = useMemo(
    () => [
      {
        text: "Open File",
        icon: BookOpen,
        action: handleOpen,
      },
      {
        text: "Rename File",
        icon: Edit,
        // action: () => openEditDocumentModal(file),
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
        // action: () => openDeleteDocumentModal(file),
      },
    ],
    []
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="bg-app_orange h-fit p-0 w-full">
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="p-[10px] pb-8 w-fit min-w-[min(180px,_97vw)]">
        {
          FILE_CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
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

export { FileContextMenu };
