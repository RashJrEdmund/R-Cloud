"use client";

import type { SharedDocument } from "@/core/interfaces/entities";

import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { loadUserSharedFiles } from "@/core/config/firebase/fire-store";
import { useUserStore } from "@/providers/stores/zustand";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { GridFileCard } from "../../authenticated-pages/files-and-folders-page/components/sub-components";
import { ModalContextProvider } from "@/providers/stores/context";

export default function SharedWithMePage() {
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
      }).finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <MainTag className="justify-start">
      <DivCard className="w-primary_app_width flex-col min-h-[85vh] border">
        {(() => {
          return (
            <>
              <TextTag
                as="h3"
                className="text-center text-[2rem] font-semibold text-app_text_grayed"
              >
                Rash Is still cooking this UI, will have it here soon.
              </TextTag>
              <TextTag
                as="h3"
                className="text-center text-[2rem] font-semibold text-app_text_grayed"
              >
                You&apos;ll get to see who shared files with you
              </TextTag>
            </>
          );

          if (!currentUser) return (
            <TextTag
              as="h3"
              className="text-center text-[2rem] font-semibold text-app_text_grayed"
            >
              You need to be logged in first
            </TextTag>
          );

          if (loading) return <LoaderCircleIcon className="animate-spin text-app_blue" />;

          if (!docs.length) return (
            <TextTag
              as="h3"
              className="text-center text-[2rem] font-semibold text-app_text_grayed"
            >
              Someone is yet to share files with you
            </TextTag>
          );

          return (
            <ModalContextProvider>
              <DivCard className="w-full flex-col overflow-hidden">
                {
                  docData.map(([email, subDocs]) => (
                    <DivCard key={email} className="flex-col">
                      <TextTag>
                        from <TextTag>{email}</TextTag>
                      </TextTag>

                      <DivCard className="w-full gap-3">
                        {
                          subDocs.map((doc) => (
                            <DivCard key={doc.doc_id}>
                              <GridFileCard doc={doc as any} />
                            </DivCard>
                          ))
                        }
                      </DivCard>
                    </DivCard>
                  ))
                }
              </DivCard>
            </ModalContextProvider>
          );
        })()}
      </DivCard>
    </MainTag>
  );
}
