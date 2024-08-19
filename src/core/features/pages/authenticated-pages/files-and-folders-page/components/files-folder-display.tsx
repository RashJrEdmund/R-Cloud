"use client";

import { DivCard, TextTag } from "@/components/atoms";
import StyledFileFolderDisplay from "./styled-file-folder-display";
import { useDocStore, useAppStore } from "@/providers/stores/zustand";
import {
  GridFileCard,
  GridFolderCard,
  ListFileCard,
  ListFolderCard,
} from "./sub-components";

import FilesFolderShimmer from "./sub-components/files-folder-shimmer";
import { MainAndTopSection } from "./main-and-top-section-tag/main-and-top-section-tag";
import { LoaderCircle } from "lucide-react";

interface Props {
  //
}

export default function FilesFolderDisplay({}: Props) {
  const { documents, loadingDocs, currentFolder, loadingCurrentFolder } =
    useDocStore();
  const { displayLayout } = useAppStore();

  // return <FilesFolderShimmer displayLayout={displayLayout} />;

  return (
    <MainAndTopSection>
      <TextTag className="break-all text-app_text_grayed">
        {(() => {
          if (loadingCurrentFolder)
            return <LoaderCircle size={20} className="animate-spin" />;

          return currentFolder === "root" ? "root" : currentFolder.name;
        })()}
      </TextTag>

      {(function () {
        // anonymous component
        if (loadingDocs)
          return <FilesFolderShimmer displayLayout={displayLayout} />;

        if (!documents?.length)
          return (
            <DivCard className="min-h-[60vh] w-full">
              <TextTag
                as="h3"
                className="text-center text-[2rem] font-semibold text-app_text_grayed"
              >
                Folder Is Empty
              </TextTag>
            </DivCard>
          );

        return (
          <StyledFileFolderDisplay
            className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
          >
            {displayLayout === "GRID"
              ? documents.map((doc) =>
                doc.type === "FOLDER" ? (
                  <GridFolderCard key={doc.id} doc={doc} />
                ) : (
                  <GridFileCard key={doc.id} doc={doc} />
                )
              )
              : documents.map((doc) =>
                doc.type === "FOLDER" ? (
                  <ListFolderCard key={doc.id} doc={doc} />
                ) : (
                  <ListFileCard key={doc.id} doc={doc} />
                )
              )}
          </StyledFileFolderDisplay>
        );
      })()}
    </MainAndTopSection>
  );
}
