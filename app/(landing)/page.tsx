import { MainTag, TextTag } from '@/components/atoms';
import { Illustrations, CtaButtons } from './_components';

interface Props { };

export default function Landing({ }: Props) {
  return (
    <MainTag>
      <section className='top'>
        <h1 className='flex items-center gap-[4px] text-center'>
          <TextTag weight='600' size='1.25rem'>
            Welcome to
          </TextTag>
          <TextTag weight='600' size='1.25rem' color_type='success'>
            R-Cloud
          </TextTag>
        </h1>
      </section>

      <Illustrations />

      <CtaButtons />
    </MainTag>
  );
}
