import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Suspense } from "react";
import { TopSection } from "@/components/molecules";
import PlanDisplay from "./_components/plan-display";
import PlanDisplayShimmer from "./_components/plan-display-shimmer";

interface Props {}

export default function StoragePlansPage({}: Props) {
  return (
    <MainTag className="w-primary_app_width justify-start">
      <TopSection hide_search_section />

      <DivCard as="section" className="mx-auto mb-8">
        <TextTag as="h2">
          <TextTag className="text-[1.25rem] font-semibold text-app_text_blue">
            R-Cloud
          </TextTag>
          <TextTag className="text-[1.25rem] font-semibold">
            Plans and pricing
          </TextTag>
        </TextTag>
      </DivCard>

      <Suspense fallback={<PlanDisplayShimmer />}>
        <PlanDisplay />
      </Suspense>
    </MainTag>
  );
}
