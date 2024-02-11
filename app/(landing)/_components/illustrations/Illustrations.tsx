import { DivCard, TextTag } from '@/components/atoms';
import { LANDING_ILLUSTRATION_CONTENT } from '@/core/ui/ui-constants';
import Image from 'next/image';

interface Props {
  //
};

export default function Illustrations({}: Props) {
  return (
    <DivCard>
      {LANDING_ILLUSTRATION_CONTENT.map(({ url, alt, description}) => (
        <DivCard
          key={alt}
          title={description}
          flex_dir='column'
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
};
