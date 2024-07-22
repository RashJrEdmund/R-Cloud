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
      <TextTag cursor="pointer" no_white_space onClick={goBack}>
        &lt;-
      </TextTag>

      <TextTag cursor="pointer" no_white_space onClick={goFoward}>
        -&gt;
      </TextTag>
    </DivCard>
  );
}
