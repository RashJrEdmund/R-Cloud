"use client";

import type { Document } from "@/core/interfaces/entities";

import { useMemo } from "react";
import { useModalContext } from "@/providers/stores/context";
import {
  useAppStore,
  useDocStore,
  useSelectionStore,
  useShareModalStore,
} from "@/providers/stores/zustand";
import {
  BookOpen,
  SquareCheckBig,
  Copy,
  Edit,
  Trash2,
  Download,
  BoxSelectIcon,
  FileLock2,
  Users,
  Link2,
  Cog,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/core/lib/utils";
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

  const { openDocDetailsModal } = useDocStore();

  const {
    openEditDocumentModal,

    openDeleteDocumentModal,
  } = useModalContext();

  const { openShareModal, copyFileShareLink } = useShareModalStore();

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
        text: "File Details",
        icon: Cog,
        action: () => openDocDetailsModal(file),
      },
      {
        text: "Share File",
        icon: FileLock2,
        disabled: true,
        sub_content: (() => {
          const sub_list = [
            {
              sub_text: "Share",
              sub_icon: Users,
              sub_action: () => openShareModal(file),
            },
          ];

          if (!file?.sharedState?.isShared) return sub_list;

          const isPublic = file?.sharedState?.accessType === "PUBLIC";

          return [
            ...sub_list,
            {
              sub_text: `Copy ${isPublic ? "public" : "private"} link`,
              sub_icon: Link2,
              sub_action: () => copyFileShareLink(file, isPublic),
            },
          ];
        })(),
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
  }, [selectionStart, selectedDocs, file]);

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
          ({ text, action, icon: Icon, disabled, sub_content }) => {
            if (!sub_content)
              return (
                <ContextMenuItem
                  key={text}
                  onClick={action}
                  disabled={!!disabled}
                  className="flex items-center justify-start gap-2"
                >
                  <Icon size={18} />

                  {text}
                </ContextMenuItem>
              );

            return (
              <ContextMenuSub key={text}>
                <ContextMenuSubTrigger className="flex items-center justify-start gap-2">
                  <Icon size={18} />

                  {text}
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-full">
                  {sub_content.map(
                    ({ sub_text, sub_icon: Sub_Icon, sub_action }) => (
                      <ContextMenuItem
                        key={sub_text}
                        onClick={sub_action}
                        className="flex items-center justify-start gap-2"
                      >
                        <Sub_Icon size={18} />

                        {sub_text}
                      </ContextMenuItem>
                    )
                  )}
                </ContextMenuSubContent>
              </ContextMenuSub>
            );
          }
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { FileContextMenu };
