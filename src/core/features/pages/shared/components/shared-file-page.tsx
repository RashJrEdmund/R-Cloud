"use client";

import type { SharedDocument } from "@/core/interfaces/entities";
import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getOnePublicDocument } from "@/core/config/firebase/fire-store";
import { LoaderCircle } from "lucide-react";
import Viewer from "@/components/modals/file-viewer/viewer";
import { useShareModalAssets, useUserStore } from "@/providers/stores/zustand";

interface Props {
  isPublicFilePage: boolean;
};

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

  const isSharedByMe = useMemo(() => currentUser?.email === sharedDoc?.shared_by, [currentUser, sharedDoc]);

  useEffect(() => {
    setLoading(true);

    getOnePublicDocument(params.doc_id)
      .then((res) => {
        if (res.exists()) {
          const data = res.data();

          if (isPublicFilePage && data.accessType === "PUBLIC") setSharedDoc(data);

          if (isPrivateFilePage && currentUser && data.sharedWith?.includes(currentUser.email)) {
            setSharedDoc(data);
          }
        };
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params, currentUser]);

  return (
    <MainTag className="flex-col gap-8">
      <TextTag className="text-xl mt-6">
        {isPublicFilePage ? "Publicly" : "Privately"} shared file
      </TextTag>

      {(() => {
        if (loading) return <LoaderCircle className="animate-spin" />;

        if (!sharedDoc) return (
          <DivCard className="flex-col text-2xl">
            <p className="">
              you sure??
            </p>

            <span className="font-semibold">
              {params.doc_id}
            </span> does not exist or has not be {isPublicFilePage ? "publicly" : "privately"} shared
          </DivCard>
        );

        return (
          <DivCard className="flex-col-reverse items-start 2xl:items-center 2xl:flex-row w-primary_app_width gap-3 border border-app_bg_light p-4">
            <DivCard className="w-full h-[min(90vh,_1000px)] xl:h-[min(80vh,_1300px)]">
              <Viewer fileInView={sharedDoc} />
            </DivCard>

            <DivCard className="min-w-[200px] md:min-w-fit flex-col gap-4 items-start">
              <TextTag>
                Name: <TextTag className="text-app_text_blue">{sharedDoc.name}</TextTag>
              </TextTag>
              <TextTag>
                Ext: <TextTag className="text-app_text_blue">{sharedDoc.extension}</TextTag>
              </TextTag>

              <TextTag>
                Shared by: {" "}
                <TextTag className="text-app_text_blue">
                  {isSharedByMe ? "YOU" : sharedDoc.shared_by}
                </TextTag>
              </TextTag>

              {
                isSharedByMe ? (
                  <TextTag className="flex-col items-start">
                    You shared with: {" "}
                    {
                      !sharedDoc.sharedWith.length ? (
                        <TextTag className="text-app_text_blue">No One</TextTag>
                      ) : sharedDoc.sharedWith.map((v) => (
                        <TextTag className="text-app_text_blue" key={v}>
                          {v}
                        </TextTag>
                      ))
                    }
                  </TextTag>
                ) : null
              }

              <TextTag className="items-start">
                Size: <TextTag className="text-app_text_blue">{sharedDoc.capacity.size}</TextTag>
              </TextTag>

              <DivCard className="flex-col items-start">
                <TextTag>Access : </TextTag>

                <TextTag>{sharedDoc.accessType} | {sharedDoc.viewerRole} </TextTag>
                <TextTag className="text-app_text_blue">{accessDescription}</TextTag>
              </DivCard>
            </DivCard>
          </DivCard>
        );
      })()}
    </MainTag>
  );
};
