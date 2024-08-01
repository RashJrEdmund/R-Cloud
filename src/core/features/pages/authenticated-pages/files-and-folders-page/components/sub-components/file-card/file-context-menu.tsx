"use client";

import type { Document } from "@/core/interfaces/entities";

import { useMemo } from "react";
import { useModalContext } from "@/providers/stores/context";
import { useAppStore, useSelectionStore } from "@/providers/stores/zustand";
import {
  BookOpen,
  SquareCheckBig,
  Copy,
  Edit,
  Trash2,
  Download,
  BoxSelectIcon,
  FileLock2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/core/lib/utils";
import { toast } from "sonner";
import { triggerFileDownload } from "@/core/utils/helpers";

interface Props {
  doc: Document;
  children: React.ReactNode;
  // handleOpen: () => void;
}

function FileContextMenu({ doc: file, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { displayLayout } = useAppStore();
  const { selectionStart, handleDocumentSelection, selectedDocs } =
    useSelectionStore();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const handleOpen = () => {
    if (selectionStart) return; // to prevent opening folders when selection has started

    router.push(`${pathname}?viewing=${file.id}`);
  };

  // const copyFileFromUrlToClipboard = () => toast.promise(async () => {
  //   // Fetch the file from the download URL
  //   const response = await fetch(file.download_url!);

  //   console.log(response, file.download_url);

  //   // Check if the fetch was successful
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch the file');
  //   }

  //   // Convert the response to a Blob
  //   const blob = await response.blob();

  //   // Determine the MIME type of the blob
  //   const mimeType = blob.type;

  //   // Create a ClipboardItem with the Blob
  //   const clipboardItem = new ClipboardItem({
  //     [mimeType]: blob
  //   });

  //   // Write the ClipboardItem to the clipboard
  //   await navigator.clipboard.write([clipboardItem]);
  // },
  //   {
  //     loading: "Downloading & converting file data",
  //     success: (v) => {

  //       return "File Downloaded";
  //     },
  //     error: () => {
  //       return "Error Downloading & Copying file"
  //     }
  //   }
  // );

  const FILE_CONTEXT_MENU_CONTENT = useMemo(() => {
    if (selectedDocs.length && selectedDocs.find((doc) => doc.id === file.id))
      return [
        {
          text: "Deselect File",
          icon: BoxSelectIcon,
          action: () => handleDocumentSelection(file),
        },
      ];

    if (selectionStart)
      return [
        {
          text: "Select File",
          icon: SquareCheckBig,
          action: () => handleDocumentSelection(file),
        },
      ];

    return [
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
        text: "Download File",
        icon: Download,
        action: () => triggerFileDownload(file.download_url!, file.name),
        disabled: true,
      },
      {
        text: "Copy File",
        icon: Copy,
        // action: copyFileFromUrlToClipboard,
        disabled: true,
      },
      {
        text: "Share File",
        icon: FileLock2,
        // action: () => null,
        disabled: true,
      },
      {
        text: "Select File",
        icon: SquareCheckBig,
        action: () => handleDocumentSelection(file),
      },
      {
        text: "Delete File",
        icon: Trash2,
        action: () => openDeleteDocumentModal(file),
      },
    ];
  }, [selectionStart, selectedDocs]);

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={cn(
          "h-fit p-0",
          displayLayout === "GRID" ? "mx-auto w-full md:w-fit" : "w-full"
        )}
      >
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-fit min-w-[min(180px,_97vw)] p-[10px] pb-8">
        {FILE_CONTEXT_MENU_CONTENT.map(
          ({ text, action, icon: Icon, disabled }) => (
            <ContextMenuItem
              key={text}
              onClick={action}
              disabled={!!disabled}
              className="lex items-center justify-start gap-2 bg-app_bg"
            >
              <Icon size={18} />

              {text}
            </ContextMenuItem>
          )
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { FileContextMenu };
