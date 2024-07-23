import { DivCard } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { CTA_CONTENT } from "../landing-ui-constants";
import Link from "next/link";

interface Props {
  //
}

export default function CtaButtons({}: Props) {
  return (
    <DivCard className="mx-auto mb-auto mt-8 w-primary_app_width gap-4 md:mt-20 md:gap-12">
      {CTA_CONTENT.map(({ text, bt_bg, url }) => (
        <Button
          asChild
          key={text}
          className="whitespace-nowrap delay-300 duration-300 hover:scale-[1.1]"
          variant={bt_bg}
          // min_width="140px"
        >
          <Link href={url}>{text}</Link>
        </Button>
      ))}
    </DivCard>
  );
}
