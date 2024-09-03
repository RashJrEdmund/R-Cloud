import { DivCard, MainTag, Separator, TextTag } from "@/components/atoms";
import {
  Illustrations,
  CtaButtons,
  TrustedBy,
  ToVideoGuides,
  Footer,
} from "./_components";

function Hero() {
  return (
    <DivCard className="min-h-[90vh] w-full flex-col">
      <DivCard as="section" className="mx-auto gap-12">
        <TextTag as="h1">
          <TextTag className="whitespace-nowrap text-[1.6rem] font-semibold md:text-[1.8rem]">
            Welcome to
          </TextTag>
          <TextTag className="text-[1.6rem] font-semibold text-app_text_blue md:text-[1.8rem]">
            R Cloud
          </TextTag>
        </TextTag>
      </DivCard>

      <Illustrations />

      <CtaButtons />
    </DivCard>
  );
}

interface Props {}

export default function LandingPage({}: Props) {
  return (
    <MainTag className="gap-0">
      <Hero />

      <TrustedBy />

      <ToVideoGuides />

      <Separator className="my-16" />

      <Footer />
    </MainTag>
  );
}
