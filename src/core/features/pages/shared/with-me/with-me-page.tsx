import { DivCard, MainTag, TextTag } from "@/components/atoms";

export default function SharedWithMePage() {
  return (
    <MainTag className="">
      <DivCard className="w-primary_app_width">
        <TextTag
          as="h3"
          className="text-center text-[2rem] font-semibold text-app_text_grayed"
        >
          Someone is yet to share files with you
        </TextTag>
      </DivCard>
    </MainTag>
  );
}
