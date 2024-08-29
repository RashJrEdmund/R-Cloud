import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Milestone } from "lucide-react";
import Image from "next/image";

export default function ToVideoGuides() {
  return (
    <DivCard className="w-primary_app_w min-h-screen flex-col sm:flex-row sm:gap-5 my-8">
      <DivCard className="w-full flex-col gap-5">
        <Image
          width={500}
          height={500}
          alt="guide section image"
          src="/landing/tour-guide.svg"
          className="w-full"
        />
      </DivCard>

      <DivCard className="w-full flex-col gap-5">
        <DivCard className="flex-col gap-2 text-center">
          <TextTag className="text-3xl md:text-5xl font-semibold">
            New to the app ?
          </TextTag>

          <TextTag className="text-app_text_grayed">
            learn how to navigate from the in app video guides.
          </TextTag>
        </DivCard>

        <Button
          asChild
          className="whitespace-nowrap md:py-6 md:transition-transform md:duration-300 md:hover:scale-[1.05]"
          variant="blued"
        >
          <Link href="/video-guides" className="text-2xl font-semibold">
            View video guides

            <Milestone className="ml-3" />
          </Link>
        </Button>
      </DivCard>
    </DivCard>
  );
}
