import { Button, DivCard } from '@/components/atoms';
import { CTA_CONTENT } from '@/core/ui/ui-constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  //
};

export default function CtaButtons({ }: Props) {
  return (
    <DivCard
      margin='5rem auto auto'
      gap='1rem'
    >
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
          {/* <FontAwesomeIcon icon={icon} /> */}
        </Button>
      ))}
    </DivCard>
  );
};
