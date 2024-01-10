import { Button } from '@/components/atoms';
import StyledCtaHolder from './StyledCtaHolder';
import { CTA_CONTENT } from '@/core/ui/ui-constants';

interface Props {
  //
};

export default function CtaButtons({ }: Props) {
  return (
    <StyledCtaHolder>
      {CTA_CONTENT.map(({ text, bt_bg, title }) => (
        <Button
          key={text}
          no_white_space
          title={title}
          hover_effect='translate'
          bg={bt_bg}
        >
          {text}
        </Button>
      ))}
    </StyledCtaHolder>
  );
};
