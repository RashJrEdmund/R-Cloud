import { TextTag } from '@/components/atoms';
import { LANDING_ILLUSTRATION_CONTENT } from '@/core/ui/ui-constants';
import Image from 'next/image';
import StyledIllustrationHolder from './StyledIllustrationHolder';

interface Props {
  //
};

export default function Illustrations({}: Props) {
  return (
    <StyledIllustrationHolder>
      {LANDING_ILLUSTRATION_CONTENT.map(({ url, alt, description}) => (
        <div className='card' key={alt} title={alt}>
          <Image
            src={url}
            alt={alt}
            height={500}
            width={500}
          />

          <TextTag>{description}</TextTag>
        </div>
      ))}
    </StyledIllustrationHolder>
  )
}