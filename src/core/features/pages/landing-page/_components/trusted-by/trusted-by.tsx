import { DivCard, TextTag } from "@/components/atoms";
import Image from "next/image";

interface Props {
  //
}

export default function TrustedBy({ }: Props) {
  return (
    <DivCard className="w-primary_app_w min-h-screen mx-auto flex-col sm:flex-row lg:gap-10 py-12 my-8">
      <DivCard className="gap-2 max-w-full">
        <TextTag className="text-7xl ssm:text-8xl lg:text-9xl font-semibold flex items-center justify-center">
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

      <DivCard className="w-full max-w-[700px]">
        <Image
          src="/landing/monthly_users.svg"
          alt="app logo"
          width={400}
          height={400}
          className="w-full"
        />
      </DivCard>
    </DivCard>
  );
}
