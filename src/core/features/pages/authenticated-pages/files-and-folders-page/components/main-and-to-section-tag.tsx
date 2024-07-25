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
import { useContextMenuContext } from "@/providers/stores/context";
import { BookmarkX, BoxSelectIcon, Folder, Trash2, Upload } from "lucide-react";

interface MainAndTopSectionProps extends ComponentProps<"main"> {
  //
};

function MainAndTopSection({
  className,
  children,
  ...restProps
}: MainAndTopSectionProps) {

  const {
    selectionStart,
    selectedDocs,
  } = useContextMenuContext();

  const CONTEXT_MENU_CONTENT = useMemo(
    () =>
      selectionStart
        ? [
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
              icon: BookmarkX,
              // action: () =>
              //   callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
            },
          ]
        : [
            {
              text: "New Folder",
              icon: Folder,
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
              icon: BoxSelectIcon,
              // action: () =>
              //   callMenuFunctionThenCloseMenu(() => toggleDocumentSelection()),
            },
          ],
    [selectionStart, selectedDocs]
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        <MainTag {...(restProps as {})} className={cn("justify-start", className)}>
          <TopSection />

          {children}
        </MainTag>
      </ContextMenuTrigger>

      <ContextMenuContent className="p-[10px] pb-8 w-fit min-w-[min(180px,_97vw)]">
        {
          CONTEXT_MENU_CONTENT.map(({ text, action, icon: Icon }) => (
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

export default MainAndTopSection;
