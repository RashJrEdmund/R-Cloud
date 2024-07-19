import { DivCard, TextTag } from "@/components/atoms";
import { Illustrations, CtaButtons } from "./_components";
import { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

interface Props { };

interface MainProps extends ComponentProps<"main"> { };

function MainTag({ className, ...restProps }: MainProps) {
  return (
    <main
      {...restProps}
      className={cn("min-h-main_min_height flex flex-col mx-auto rounded-[4px] py-[2rem]", className)}
    />
  );
};

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
