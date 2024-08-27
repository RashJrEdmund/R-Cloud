import { DivCard, TextTag } from "@/components/atoms";
import Image from "next/image";

interface Props {
  //
}

export default function TrustedBy({ }: Props) {
  return (
    <DivCard className="w-primary_app_width mx-auto flex-col lg:gap-12 min-h-screen py-12">
      <DivCard className="w-full flex-col sm:flex-row lg:gap-10">
        <DivCard className="gap-2">
          <TextTag className="text-7xl ssm:text-8xl md:text-9xl font-semibold flex items-center justify-center">
            15
          </TextTag>

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
