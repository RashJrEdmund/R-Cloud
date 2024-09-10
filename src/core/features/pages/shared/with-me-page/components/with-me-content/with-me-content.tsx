"use client";

import type { SharedDocument } from "@/core/interfaces/entities";

import { DivCard, TextTag } from "@/components/atoms";
import { loadUserSharedFiles } from "@/core/config/firebase/fire-store";
import { useAppStore, useUserStore } from "@/providers/stores/zustand";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { WithMeGridFileCard, WithMeListFileCard } from "./sub-components";
import StyledFileFolderDisplay from "../../../../authenticated-pages/files-and-folders-page/components/files-folder-display/styled-file-folder-display";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function DocumentRenderer({ documents }: { documents: SharedDocument[] }) {
  const { displayLayout } = useAppStore();

  return (
    <StyledFileFolderDisplay
      className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
    >
      {displayLayout === "GRID"
        ? documents.map((doc) => (
            <WithMeGridFileCard key={doc.doc_id} file={doc} />
          ))
        : documents.map((doc) => (
            <WithMeListFileCard key={doc.doc_id} file={doc} />
          ))}
    </StyledFileFolderDisplay>
  );
}

export default function WithMeContent() {
  const [docs, setDocs] = useState<SharedDocument[]>([]);
  const { currentUser } = useUserStore();

  const [loading, setLoading] = useState<boolean>(true);

  const docData = useMemo(() => {
    if (!docs || !docs.length) return [];

    const data: Record<string, SharedDocument[]> = {};

    docs.forEach(({ shared_by, ...restDoc }) => {
      if (data[shared_by]) data[shared_by].push({ shared_by, ...restDoc });
      else data[shared_by] = [{ shared_by, ...restDoc }];
    });

    // console.log("page data", Object.entries(data));
    return Object.entries(data);
  }, [docs]);

  useEffect(() => {
    if (!currentUser) return setLoading(false);

    setLoading(true);

    loadUserSharedFiles(currentUser.email)
      .then((res) => {
        setDocs(res.docs.map((d) => d.data()));
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

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

        if (loading)
          return <LoaderCircleIcon className="animate-spin text-app_blue" />;

        if (!docs.length)
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

            {/* <pre className="w-primary_app_w mx-auto overflow-auto">
                {JSON.stringify(docData, null, 4)}
              </pre> */}
          </>
        );
      })()}
    </DivCard>
  );
}
