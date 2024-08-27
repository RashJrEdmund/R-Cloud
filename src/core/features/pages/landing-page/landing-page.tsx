import { DivCard, MainTag, Separator, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons, TrustedBy, Recordings, Footer } from "./_components";

function Hero() {
  return (
    <DivCard className="min-h-[90vh] w-full flex-col">
      <DivCard as="section" className="mx-auto gap-12">
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
  );
}

interface Props { };

export default function LandingPage({ }: Props) {
  return (
    <MainTag className="gap-0">
      <Hero />

      <TrustedBy />

      <Recordings />

      <Separator className="my-16" />

      <Footer />
    </MainTag>
  );
}
