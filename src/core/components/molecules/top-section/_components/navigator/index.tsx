"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { useRouter } from "next/navigation";

interface Props {
  //
}

export default function Navigator({}: Props) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goFoward = () => {
    router.forward();
  };

  return (
    <DivCard className="gap-4 self-start">
      <TextTag className="cursor-pointer whitespace-nowrap" onClick={goBack}>
        &lt;-
      </TextTag>

      <TextTag className="cursor-pointer whitespace-nowrap" onClick={goFoward}>
        -&gt;
      </TextTag>
    </DivCard>
  );
}
