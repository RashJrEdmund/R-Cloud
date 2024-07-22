import { DivCard, TextTag } from "@/components/atoms";
import { LANDING_ILLUSTRATION_CONTENT } from "@/features/pages/ui-constants";
import Image from "next/image";
import { StyledIllustrations } from "./styled-illustration";

interface Props {
  //
}

export default function Illustrations({}: Props) {
  return (
    <StyledIllustrations>
      {LANDING_ILLUSTRATION_CONTENT.map(({ url, alt, description }) => (
        <DivCard
          key={alt}
          title={description}
          className="illustration flex-col"
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
    </StyledIllustrations>
  );
}
