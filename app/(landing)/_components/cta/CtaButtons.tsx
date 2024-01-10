import { Button, TextTag } from '@/components/atoms';
import StyledCtaHolder from './StyledCtaHolder';
import { CTA_CONTENT } from '@/core/ui/ui-constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  //
};

export default function CtaButtons({ }: Props) {
  return (
    <StyledCtaHolder>
      {CTA_CONTENT.map(({ text, bt_bg, title, url, icon }) => (
        <Button
          as='a'
          href={url}
          key={text}
          no_white_space
          title={title}
          hover_effect='scale'
          bg={bt_bg}
          min_width='140px'
        >
          {text}
        </Button>
      ))}
    </StyledCtaHolder>
  );
};
