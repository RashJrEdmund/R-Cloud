"use client";

import { useMemo } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useModalContext } from "@/providers/stores/context";
import {
  BoxSelectIcon,
  SquareCheckBig,
  Folder,
  Trash2,
  Upload,
  Cog,
} from "lucide-react";
import { useDocStore, useSelectionStore } from "@/providers/stores/zustand";
import { openFileUploadDialog } from "@/core/utils/helpers";

interface MainAndTopContextMenuProps {
  children: React.ReactNode;
  className?: string;
}

function MainAndContextMenu({
  className,
  children,
}: MainAndTopContextMenuProps) {
  const { setNewFolderDialogOpen, setBulkDeleteDialogOpen } = useModalContext();

  const { selectionStart, selectedDocs, toggleDocumentSelection } =
    useSelectionStore();

  const { openDocDetailsModal, currentFolder } = useDocStore();

  const CONTEXT_MENU_CONTENT = useMemo(() => {
    if (selectionStart)
      return [
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
      ];

    return [
      {
        text: "New Folder",
        icon: Folder,
        action: () => setNewFolderDialogOpen(true),
      },
      {
        text: "Upload File(s)",
        icon: Upload,
        action: openFileUploadDialog,
      },
      {
        text: "Current Folder Details",
        icon: Cog,
        action: () => openDocDetailsModal(currentFolder),
      },
      {
        text: "Start Selection",
        icon: SquareCheckBig,
        action: toggleDocumentSelection,
      },
    ];
  }, [selectionStart, selectedDocs, currentFolder]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>
        <>{children}</>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-fit min-w-[min(180px,_97vw)] p-[10px] pb-8">
        {CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
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

export { MainAndContextMenu };
