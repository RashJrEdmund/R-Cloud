"use client";

import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { loadUserSharedFiles } from "@/core/config/firebase/fire-store";
import { SharedDocument } from "@/core/interfaces/entities";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function SharedWithMePage() {
  const [docs, setDocs] = useState<SharedDocument[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    loadUserSharedFiles("orashusedmund@gmail.com")
      .then((res) => {
        setDocs(res.docs.map((d) => d.data()));
      }).finally(() => setLoading(false));
  }, []);

  return (
    <MainTag className="">
      <DivCard className="w-primary_app_width flex-col">

        {(() => {

          if (loading) return <LoaderCircleIcon className="animate-spin" />;

          if (!docs.length) return (
            <TextTag
              as="h3"
              className="text-center text-[2rem] font-semibold text-app_text_grayed"
            >
              Someone is yet to share files with you
            </TextTag>
          );

          return (
            <pre className="">
              {JSON.stringify(docs, null, 4)}
            </pre>
          );
        })()}
      </DivCard>
    </MainTag>
  );
}
