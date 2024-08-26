import { DivCard, MainTag, Separator, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons, TrustedBy, Recordings, Footer } from "./_components";

interface Props { };

export default function LandingPage({ }: Props) {
  return (
    <MainTag className="gap-0">
      <DivCard className="min-h-screen w-full flex-col">
        <DivCard as="section" className="mx-auto mt-8 gap-12">
          <TextTag as="h1">
            <TextTag className="whitespace-nowrap text-[1.6rem] md:text-[1.8rem] font-semibold">
              Welcome to
            </TextTag>
            <TextTag className="text-[1.6rem] md:text-[1.8rem] font-semibold text-app_text_blue">
              R Cloud
            </TextTag>
          </TextTag>
        </DivCard>

        <Illustrations />

        <CtaButtons />
      </DivCard>

      <TrustedBy />

      <Separator className="mb-16" />

      <Recordings />

      <Separator className="my-16" />

      <Footer />
    </MainTag>
  );
}
