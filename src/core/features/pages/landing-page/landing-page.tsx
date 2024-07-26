import { DivCard, MainTag, Separator, TextTag } from "@/components/atoms";
import {
  Illustrations,
  CtaButtons,
  Recordings
} from "./_components";

interface Props { }

export default function LandingPage({ }: Props) {
  return (
    <MainTag>
      {/* <DivCard className="w-full flex-col min-h-screen"> */}
        <DivCard as="section" className="mx-auto mt-8 gap-12">
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
      {/* </DivCard> */}

      <CtaButtons />

      <Separator className="my-16" />

      <Recordings />
    </MainTag>
  );
}
