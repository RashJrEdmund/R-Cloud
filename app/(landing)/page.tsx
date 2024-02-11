import { DivCard, MainTag, TextTag } from '@/components/atoms';
import { Illustrations, CtaButtons } from './_components';

interface Props { };

export default function Landing({ }: Props) {
  return (
    <MainTag justify='center'>
      <DivCard
        as='section'
      >
        <TextTag as='h1'>
          <TextTag weight='600' size='1.25rem'>
            Welcome to
          </TextTag>
          <TextTag weight='600' size='1.25rem' color_type='success'>
            R-Cloud
          </TextTag>
        </TextTag>
      </DivCard>

      <Illustrations />

      <CtaButtons />
    </MainTag>
  );
}
