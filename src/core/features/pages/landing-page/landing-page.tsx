import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons } from "./_components";

interface Props { };

export default function LandingPage({ }: Props) {
  return (
    <MainTag className="justify-center">
      <DivCard as="section" margin="2rem auto 0">
        <TextTag as="h1">
          <TextTag no_white_space weight="600" size="1.25rem">
            Welcome to
          </TextTag>
          <TextTag
            no_white_space
            weight="600"
            size="1.25rem"
            color_type="success"
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
