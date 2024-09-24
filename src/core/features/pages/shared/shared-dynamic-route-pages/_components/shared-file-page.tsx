"use client";

import type { SharedDocument } from "@/core/interfaces/entities";
import { DivCard, TextTag } from "@/components/atoms";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getOnePublicDocument } from "@/core/config/firebase/fire-store";
import { LoaderCircle } from "lucide-react";
import Viewer from "@/components/modals/file-viewer/viewer";
import { useShareModalAssets, useUserStore } from "@/providers/stores/zustand";
import Image from "next/image";

interface Props {
  isPublicFilePage: boolean;
}

/**
 * also using this component in /shared/me/[doc_id] dynamic route page
 */
export default function SharedFilePage({ isPublicFilePage }: Props) {
  const [isPrivateFilePage] = useState(!isPublicFilePage);
  const { currentUser } = useUserStore();

  const { Access, Viewers } = useShareModalAssets;

  const [loading, setLoading] = useState<boolean>(true);

  const [sharedDoc, setSharedDoc] = useState<SharedDocument | null>(null);

  const params = useParams<{ doc_id: string }>();

  const accessDescription = useMemo(() => {
    if (!sharedDoc) return "";

    const access = Access.find((a) => a.type === sharedDoc.accessType);

    const role = Viewers.find((v) => v.type === sharedDoc.viewerRole);

    return `${access?.desc} ${role?.desc}`;
  }, [Access, Viewers, sharedDoc]);

  const isSharedByMe = useMemo(
    () => currentUser?.email === sharedDoc?.shared_by,
    [currentUser, sharedDoc]
  );

  useEffect(() => {
    setLoading(true);

    getOnePublicDocument(params.doc_id)
      .then((res) => {
        if (res.exists()) {
          const data = res.data();

          if (isPublicFilePage && data.accessType === "PUBLIC")
            setSharedDoc(data);

          if (
            isPrivateFilePage &&
            currentUser &&
            data.sharedWith?.includes(currentUser.email)
          ) {
            setSharedDoc(data);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params, currentUser, isPublicFilePage, isPrivateFilePage]);

  return (
    <>
      <TextTag className="mb-4 text-xl">
        {isPublicFilePage ? "Publicly" : "Privately"} shared file
      </TextTag>

      {(() => {
        if (loading)
          return <LoaderCircle className="animate-spin text-app_blue" />;

        if (!sharedDoc)
          return (
            <DivCard className="max-w-primary_app_w flex-col text-2xl">
              <TextTag className="text-xl">Sorry File does not exist</TextTag>

              <Image
                src="/files/file-not-found.svg"
                alt="file not found"
                width={500}
                height={500}
              />

              <TextTag className="text-center">
                file does not exist or has not be{" "}
                {isPublicFilePage ? "publicly" : "privately"} shared
              </TextTag>
            </DivCard>
          );

        return (
          <DivCard className="w-primary_app_w flex-col-reverse items-start gap-3 border border-app_bg_light p-4 2xl:flex-row 2xl:items-center">
            <DivCard className="h-[min(90vh,_1000px)] w-full xl:h-[min(80vh,_1300px)]">
              <Viewer fileInView={sharedDoc} />
            </DivCard>

            <DivCard className="min-w-[200px] flex-col items-start gap-4 md:min-w-fit">
              <TextTag>
                Name:{" "}
                <TextTag className="text-app_text_blue">
                  {sharedDoc.name}
                </TextTag>
              </TextTag>
              <TextTag>
                Ext:{" "}
                <TextTag className="text-app_text_blue">
                  {sharedDoc.extension}
                </TextTag>
              </TextTag>

              <TextTag>
                Shared by:{" "}
                <TextTag className="text-app_text_blue">
                  {isSharedByMe ? "YOU" : sharedDoc.shared_by}
                </TextTag>
              </TextTag>

              {isSharedByMe ? (
                <TextTag className="flex-col items-start">
                  You shared with:{" "}
                  {!sharedDoc.sharedWith.length ? (
                    <TextTag className="text-app_text_blue">No One</TextTag>
                  ) : (
                    sharedDoc.sharedWith.map((v) => (
                      <TextTag className="text-app_text_blue" key={v}>
                        {v}
                      </TextTag>
                    ))
                  )}
                </TextTag>
              ) : null}

              <TextTag className="items-start">
                Size:{" "}
                <TextTag className="text-app_text_blue">
                  {sharedDoc.capacity.size}
                </TextTag>
              </TextTag>

              <DivCard className="flex-col items-start">
                <TextTag>Access : </TextTag>

                <TextTag>
                  {sharedDoc.accessType} | {sharedDoc.viewerRole}{" "}
                </TextTag>
                <TextTag className="text-app_text_blue">
                  {accessDescription}
                </TextTag>
              </DivCard>
            </DivCard>
          </DivCard>
        );
      })()}
    </>
  );
}
