import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons } from "./_components";

interface Props { };

export default function LandingPage({ }: Props) {
  return (
    <MainTag>
      <DivCard as="section" className="mx-auto mt-8">
        <TextTag as="h1">
          <TextTag className="whitespace-nowrap text-[1.25rem] font-semibold">
            Welcome to
          </TextTag>
          <TextTag className="text-[1.25rem] font-semibold text-app_text_blue">
            R Cloud
          </TextTag>
        </TextTag>
      </DivCard>

      <Illustrations />

      <CtaButtons />
    </MainTag>
  );
}
