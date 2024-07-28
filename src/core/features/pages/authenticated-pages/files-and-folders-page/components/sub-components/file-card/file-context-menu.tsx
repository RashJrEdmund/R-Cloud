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

  const { selectionStart } = useContextMenuStore();

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
      <ContextMenuTrigger className="h-fit w-full p-0">
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
