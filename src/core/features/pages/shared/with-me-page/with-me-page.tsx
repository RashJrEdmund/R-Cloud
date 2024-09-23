import { MainTag } from "@/components/atoms";
import { WithMeContent, WithMeTopSection } from "./components";

export default function SharedWithMePage() {
  return (
    <MainTag className="justify-start">
      <WithMeTopSection />

      <WithMeContent />
    </MainTag>
  );
}
