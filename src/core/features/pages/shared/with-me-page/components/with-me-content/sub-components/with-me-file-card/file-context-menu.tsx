"use client";

import type { SharedDocument } from "@/core/interfaces/entities";

import { useMemo } from "react";
import { useAppStore } from "@/providers/stores/zustand";
import { BookOpen, Link2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn, copyToClipboard } from "@/core/lib/utils";
import { APP_CONFIG } from "@/core/config/app";

interface Props {
  doc: SharedDocument;
  children: React.ReactNode;
}

function WithMeFileContextMenu({ doc: file, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { displayLayout } = useAppStore();

  const handleOpen = () => {
    router.push(`${pathname}/${file.doc_id}`);
  };

  const handleCopyFileShareLink = () => {
    const url = `${APP_CONFIG.app_link}/shared/me/${file.doc_id}`;
    const msg = "Private share url copied to clipboard";

    copyToClipboard({ data: url, toast_header: msg });
  };

  const FILE_CONTEXT_MENU_CONTENT = useMemo(() => {
    return [
      {
        text: "Open File",
        icon: BookOpen,
        action: handleOpen,
        disabled: undefined,
      },
      {
        text: "Copy private Link",
        icon: Link2,
        action: handleCopyFileShareLink,
      },
    ];
  }, []);

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
          ({ text, action, icon: Icon, disabled }) => {
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
          }
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { WithMeFileContextMenu };
