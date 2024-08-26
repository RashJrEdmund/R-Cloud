import { DivCard, TextTag } from "@/components/atoms";
// import { LANDING_ILLUSTRATION_CONTENT } from "../landing-ui-constants";
// import Image from "next/image";
// import { cn } from "@/core/lib/utils";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";

interface Props {
  //
}

export default function TrustedBy({ }: Props) {
  return (
    <DivCard className="w-primary_app_width mx-auto flex-col lg:gap-12 min-h-[89vh] py-12">
      <DivCard className="w-full flex-col sm:flex-row ssm:gap-5 lg:gap-10">
        <DivCard className="gap-2 md:gap-5">
          <NumberTicker value={8} className="text-7xl md:text-9xl h-[200px] font-semibold flex items-center justify-center" />

          <DivCard className="flex-col items-start">
            <TextTag className="w-fit whitespace-nowrap">
              Active Monthly
            </TextTag>

            <TextTag className="text-3xl md:text-5xl whitespace-nowrap">
              Users 😌
            </TextTag>
          </DivCard>
        </DivCard>

        <Image
          src="/icons/r-cloud-logo.svg"
          alt="app logo"
          width={400}
          height={400}
          className="max-w-[300px] md:max-w-full"
        />
      </DivCard>

    </DivCard>
  );
}
