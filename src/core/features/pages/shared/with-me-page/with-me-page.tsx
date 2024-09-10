import { DivCard, MainTag } from "@/components/atoms";
import { WithMeContent } from "./components";
import {
  DisplayLayout,
  Navigator,
} from "@/components/molecules/top-section/components";

function WithMeTopSection() {
  return (
    <DivCard className="mx-auto mb-4 h-fit w-primary_app_w justify-between p-[10px]">
      <Navigator />

      <DisplayLayout />
    </DivCard>
  );
}

export default function SharedWithMePage() {
  return (
    <MainTag className="justify-start">
      <WithMeTopSection />

      <WithMeContent />
    </MainTag>
  );
}
