import { ComponentProps, useMemo } from "react";
import { cn } from "@/core/lib/utils";
import { MainTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useModalContext } from "@/providers/stores/context";
import { BoxSelectIcon, SquareCheckBig, Folder, Trash2, Upload } from "lucide-react";
import { useSelectionStore } from "@/providers/stores/zustand";

interface MainAndTopSectionProps extends ComponentProps<"main"> {
  //
}

function MainAndTopSection({
  className,
  children,
  ...restProps
}: MainAndTopSectionProps) {
  const { setNewFolderDialogOpen } = useModalContext();

  const { selectionStart, selectedDocs, toggleDocumentSelection } = useSelectionStore();

  const CONTEXT_MENU_CONTENT = useMemo(
    () => {
      if (selectionStart) return [
        {
          text: "Delete Selected",
          icon: Trash2,
          action: () => "",
          // callMenuFunctionThenCloseMenu(() =>
          //   openBulkDeleteModal(selectedDocs)
          // ),
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
          // action: () =>
          //   callMenuFunctionThenCloseMenu(() => openNewFolderModal()),
        },
        {
          text: "Upload File(s)",
          icon: Upload,
          // action: () =>
          //   callMenuFunctionThenCloseMenu(() => openFileUploadDialog()),
        },
        {
          text: "Start Selection",
          icon: SquareCheckBig,
          action: toggleDocumentSelection,
        },
      ];
    },
    [selectionStart, selectedDocs],
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        <MainTag
          {...(restProps as {})}
          className={cn("justify-start", className)}
        >
          <TopSection />

          {children}
        </MainTag>
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

export default MainAndTopSection;
