"use client";

import type { SharedDocument } from "@/core/interfaces/entities";

import { DivCard, TextTag } from "@/components/atoms";
import { useAppStore, useUserStore } from "@/providers/stores/zustand";
import { LoaderCircleIcon } from "lucide-react";
import { WithMeGridFileCard, WithMeListFileCard } from "./sub-components";
import FileFolderDisplayContainer from "../../../../authenticated-pages/files-and-folders-page/components/files-folder-display/sub/file-folder-display-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLoadUserSharedFiles } from "../../api/with-me.queries";

function DocumentRenderer({ documents }: { documents: SharedDocument[] }) {
  const { displayLayout } = useAppStore();

  return (
    <FileFolderDisplayContainer>
      {displayLayout === "GRID"
        ? documents.map((doc) => (
            <WithMeGridFileCard key={doc.doc_id} file={doc} />
          ))
        : documents.map((doc) => (
            <WithMeListFileCard key={doc.doc_id} file={doc} />
          ))}
    </FileFolderDisplayContainer>
  );
}

export default function WithMeContent() {
  const { currentUser } = useUserStore();

  const {
    data: docData,
    refetch,
    isFetching,
  } = useLoadUserSharedFiles(currentUser);

  return (
    <DivCard className="min-h-[60vh] w-primary_app_w flex-col justify-start">
      {(() => {
        if (!currentUser)
          return (
            <TextTag
              as="h3"
              className="text-center text-[2rem] font-semibold text-app_text_grayed"
            >
              You need to be logged in first
            </TextTag>
          );

        if (isFetching)
          return <LoaderCircleIcon className="animate-spin text-app_blue" />;

        if (!docData?.length)
          return (
            <TextTag
              as="h3"
              className="text-center text-[2rem] font-semibold text-app_text_grayed"
            >
              Someone is yet to share files with you
            </TextTag>
          );

        return (
          <>
            {docData.map(([email, subDocs]) => (
              <Accordion
                key={email}
                type="single"
                collapsible={docData.length > 1}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Button
                      variant="black"
                      className="w-fit min-w-[min(300px,_79vw)] px-4"
                    >
                      {email}
                    </Button>
                  </AccordionTrigger>

                  <AccordionContent className="p-4">
                    <DivCard className="w-full justify-start gap-3">
                      <DocumentRenderer documents={subDocs} />
                    </DivCard>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </>
        );
      })()}
    </DivCard>
  );
}
