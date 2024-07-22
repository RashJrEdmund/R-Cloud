import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons } from "./_components";

interface Props {}

export default function LandingPage({}: Props) {
  return (
    <MainTag className="justify-center">
      <DivCard as="section" className="mx-auto mt-8">
        <TextTag as="h1">
          <TextTag className="text-[1.25rem] font-semibold whitespace-nowrap">
            Welcome to
          </TextTag>
          <TextTag
            className="font-semibold text-[1.25rem] text-app_text_blue"
          >
            R Cloud
          </TextTag>
        </TextTag>
      </DivCard>

      <Illustrations />

      <CtaButtons />
    </MainTag>
  );
}
