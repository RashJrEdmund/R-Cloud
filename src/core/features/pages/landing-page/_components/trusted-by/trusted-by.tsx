import { DivCard, TextTag } from "@/components/atoms";
import Image from "next/image";

interface Props {
  //
}

export default function TrustedBy({}: Props) {
  return (
    <DivCard className="mx-auto my-8 min-h-screen w-primary_app_w flex-col py-12 sm:flex-row lg:gap-10">
      <DivCard className="max-w-full gap-2">
        <TextTag className="flex items-center justify-center text-7xl font-semibold ssm:text-8xl lg:text-9xl">
          17
        </TextTag>

        <DivCard className="flex-col items-start">
          <TextTag className="w-fit whitespace-nowrap">Active Monthly</TextTag>

          <TextTag className="whitespace-nowrap text-3xl md:text-5xl">
            Users 🚀
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
