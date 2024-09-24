"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDocStore } from "@/providers/stores/zustand";
import { DocDetailsSheetContent } from "./doc-details-sheet-content";

export default function DocDetailsSheet() {
  const {
    docDetailsData,
    setDocDetailsData,
    currentFolder,

    docDetailsModalOpen,
    setDocDetailsModalOpen,
  } = useDocStore();

  const toggleModal = (state: boolean) => {
    if (state) {
      setDocDetailsModalOpen(true);
      return;
    }
    setDocDetailsData(null);

    setDocDetailsModalOpen(false);
  };

  const isRootFolder = typeof docDetailsData === "string";

  return (
    <Sheet open={docDetailsModalOpen} onOpenChange={toggleModal}>
      <SheetContent
        side="left"
        className="w-full bg-app_bg sm:w-[min(500px,_80vw)]"
      >
        <SheetHeader className="mb-4 w-full">
          <SheetTitle>
            {isRootFolder ? "Root Folder" : docDetailsData?.name}
          </SheetTitle>

          <SheetDescription>
            {(() => {
              if (isRootFolder) return "Root folder";

              return docDetailsData?.type === "FOLDER" ? "folder" : "file";
            })()}{" "}
            details
          </SheetDescription>
        </SheetHeader>

        <DocDetailsSheetContent doc={docDetailsData} />

        <SheetFooter className="mt-8 w-full">
          <SheetClose asChild className="w-full">
            <Button type="submit">Got it ! 👍</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
