import { useEffect, useCallback } from "react";

import { cn } from "@/core/lib/utils";
import { MainTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";

import { MainAndContextMenu } from "./main-and-top-context-menu";

import { useUploadModalContext } from "@/providers/stores/context";

import { openFileUploadDialog } from "@/core/utils/helpers";

import type { DragEventHandler, ComponentProps } from "react";

interface MainAndTopSectionProps extends ComponentProps<"main"> {
  //
}

function MainAndTopSection({
  className,
  children,
  ...restProps
}: MainAndTopSectionProps) {
  const { readyUploadModal } = useUploadModalContext();

  // DRAG_DROP_HANDLERS_STARTS_HERE!

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const { files, items } = e.dataTransfer;

    readyUploadModal(files, items);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  // DRAG_DROP_HANDLERS_ENDS_HERE!

  const handleFileUploadInputFieldData = useCallback<(e: Event) => void>(
    (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;
      readyUploadModal(files);
    },
    [],
  );

  useEffect(() => {
    const fileUploadField =
      document.querySelector<HTMLInputElement>("#file-upload-field");

    if (!fileUploadField) return;

    fileUploadField.addEventListener(
      "change",
      handleFileUploadInputFieldData,
      false
    );

    return () => {
      fileUploadField.removeEventListener(
        "change",
        handleFileUploadInputFieldData,
        false
      );
      fileUploadField.value = "";
    };
  }, [handleFileUploadInputFieldData]);

  return (
    <MainAndContextMenu className="">
      <MainTag
        {...(restProps as {})}
        className={cn("justify-start select-none", className)}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        <TopSection />

        {children}
      </MainTag>
    </MainAndContextMenu>
  );
}

export { MainAndTopSection };
