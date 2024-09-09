"use client";

import { MainTag } from "@/components/atoms";
import { WithMeContent } from "./_components";
import { TopSection } from "@/components/molecules";

export default function SharedWithMePage() {
  return (
    <MainTag className="justify-start">
      <TopSection hide_search_section />

      <WithMeContent />
    </MainTag>
  );
}
