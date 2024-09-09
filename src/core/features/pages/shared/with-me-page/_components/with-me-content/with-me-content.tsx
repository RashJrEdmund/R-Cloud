"use client";

import type { Document, SharedDocument } from "@/core/interfaces/entities";

import { DivCard, TextTag } from "@/components/atoms";
import { loadUserSharedFiles } from "@/core/config/firebase/fire-store";
import { useAppStore, useUserStore } from "@/providers/stores/zustand";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { GridFileCard, GridFolderCard, ListFileCard, ListFolderCard } from "../../../../authenticated-pages/files-and-folders-page/components/sub-components";
import { ModalContextProvider } from "@/providers/stores/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import StyledFileFolderDisplay from "../../../../authenticated-pages/files-and-folders-page/components/files-folder-display/styled-file-folder-display";

function DocumentRenderer({ documents }: { documents: SharedDocument[] }) {
  const { displayLayout } = useAppStore();

  return (
    <StyledFileFolderDisplay
      className={displayLayout.toLowerCase() + "-layout"} // e.g grid-layout or list-layout
    >
      {displayLayout === "GRID"
        ? documents.map((doc) =>
          doc.type === "FOLDER" ? (
            <GridFolderCard key={doc.doc_id} doc={doc as unknown as Document} />
          ) : (
            <GridFileCard key={doc.doc_id} doc={doc as unknown as Document} />
          )
        )
        : documents.map((doc) =>
          doc.type === "FOLDER" ? (
            <ListFolderCard key={doc.doc_id} doc={doc as unknown as Document} />
          ) : (
            <ListFileCard key={doc.doc_id} doc={doc as unknown as Document} />
          )
        )}
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

    console.log({ data });

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
    <DivCard className="min-h-[85vh] w-primary_app_w flex-col justify-start">
      {(() => {
        // return (
        //   <>
        //     <TextTag
        //       as="h3"
        //       className="text-center text-[2rem] font-semibold text-app_text_grayed"
        //     >
        //       Rash Is still cooking this UI, will have it here soon.
        //     </TextTag>
        //     <TextTag
        //       as="h3"
        //       className="text-center text-[2rem] font-semibold text-app_text_grayed"
        //     >
        //       You&apos;ll get to see who shared files with you
        //     </TextTag>
        //   </>
        // );

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
          <ModalContextProvider>
            {docData.map(([email, subDocs]) => (
              <Accordion
                key={email}
                type="single"
                collapsible={docData.length > 1}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Button variant="black" className="px-4 w-fit min-w-[min(300px,_79vw)]">
                      {email}
                    </Button>
                  </AccordionTrigger>

                  <AccordionContent className="p-4">
                    <DivCard className="w-full justify-start gap-3">
                      {/* {subDocs.map((doc) => (
                          <DivCard key={doc.doc_id}>
                            <GridFileCard doc={doc as any} />
                          </DivCard>
                        ))} */}

                      <DocumentRenderer documents={subDocs} />
                    </DivCard>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

            {/* <pre className="w-primary_app_w mx-auto overflow-auto">
                {JSON.stringify(docData, null, 4)}
              </pre> */}
          </ModalContextProvider>
        );
      })()}
    </DivCard>
  );
}
