"use client";

import { MainTag } from "@/components/atoms";
import { useParams } from "next/navigation";

export default function PublicSharePage() {
  const params = useParams<{ doc_id: string }>();

  return (
    <MainTag className="flex-col">
      public url with me

      <p>doc id is <span className="font-semibold">{params.doc_id}</span></p>
    </MainTag>
  )
};
