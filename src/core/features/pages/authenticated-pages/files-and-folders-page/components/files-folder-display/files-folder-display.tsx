"use client";

import { DivCard, Separator, TextTag } from "@/components/atoms";
import FileFolderDisplayContainer from "./sub/file-folder-display-container";
import { useDocStore, useAppStore } from "@/providers/stores/zustand";
import {
  GridFileCard,
  GridFolderCard,
  ListFileCard,
  ListFolderCard,
} from "../sub-components";

import FilesFolderShimmer from "./sub/files-folder-shimmer";
import { MainAndTopSection } from "../main-and-top-section-tag/main-and-top-section-tag";
import { LoaderCircle } from "lucide-react";
import { useCallback, useMemo } from "react";
import type { Document } from "@/core/interfaces/entities";

function DocumentRenderer({ documents }: { documents: Document[] }) {
  const { displayLayout } = useAppStore();

  return (
    <FileFolderDisplayContainer>
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
    </FileFolderDisplayContainer>
  );
}

interface Props {
  //
}

export default function FilesFolderDisplay({}: Props) {
  const {
    documents: docs,
    loadingDocs,
    currentFolder,
    loadingCurrentFolder,
  } = useDocStore();

  const { folderSeparation } = useAppStore();

  const getFolders = useCallback(() => {
    return docs.filter(({ type }) => type === "FOLDER");
  }, [docs, folderSeparation]);

  const getFiles = useCallback(() => {
    return docs.filter(({ type }) => type === "FILE");
  }, [docs, folderSeparation]);

  const documents = useMemo(() => {
    if (folderSeparation === "NONE") return docs;

    return [...getFolders(), ...getFiles()];
  }, [docs, folderSeparation]);

  return (
    <MainAndTopSection>
      <TextTag className="mb-2 break-all text-app_text_grayed">
        {(() => {
          if (loadingCurrentFolder)
            return <LoaderCircle size={20} className="animate-spin" />;

          return currentFolder === "root" ? "root" : currentFolder.name;
        })()}
      </TextTag>

      {(function () {
        // anonymous component
        if (loadingDocs) return <FilesFolderShimmer />;

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

        return !folderSeparation ||
          ["NONE", "LOW"].includes(folderSeparation) ? (
          <DocumentRenderer documents={documents} />
        ) : (
          <>
            {(() => {
              const folders = getFolders();

              return (
                folders.length > 0 && (
                  <>
                    <DocumentRenderer documents={folders} />

                    <Separator />
                  </>
                )
              );
            })()}

            {(() => {
              const files = getFiles();

              return files.length > 0 && <DocumentRenderer documents={files} />;
            })()}
          </>
        );
      })()}
    </MainAndTopSection>
  );
}
