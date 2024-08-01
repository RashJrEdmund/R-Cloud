import { DivCard, TextTag } from "@/components/atoms";
import { LANDING_ILLUSTRATION_CONTENT } from "../landing-ui-constants";
import Image from "next/image";
import { cn } from "@/core/lib/utils";

interface Props {
  //
}

export default function Illustrations({}: Props) {
  return (
    <DivCard className="w-full">
      {LANDING_ILLUSTRATION_CONTENT.map(({ url, alt, description }, i) => (
        <DivCard
          key={alt}
          className={cn(
            "flex-col",
            i === 1 ? "hidden mdxl:flex" : "" // to hide the second image
          )}
        >
          <Image
            src={url}
            alt={alt}
            height={500}
            width={500}
            draggable={false}
          />

          <TextTag>{description}</TextTag>
        </DivCard>
      ))}
    </DivCard>
  );
}
