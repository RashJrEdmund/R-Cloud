import { Button, DivCard } from "@/components/atoms";
import { CTA_CONTENT } from "@/features/pages/ui-constants";
import Link from "next/link";

interface Props {
  //
}

export default function CtaButtons({}: Props) {
  return (
    <DivCard className="mx-auto mb-auto mt-20 gap-4">
      {CTA_CONTENT.map(({ text, bt_bg, title, url }) => (
        <Button
          as={Link}
          no_white_space
          href={url}
          key={text}
          title={title}
          hover_effect="scale"
          bg={bt_bg}
          min_width="140px"
        >
          {text}
        </Button>
      ))}
    </DivCard>
  );
}
