import { Metadata } from 'next';
import { Button, DivCard, MainTag, TextTag } from '@/components/atoms';
import { ProgressBar, TopSection } from '@/components/molecules';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: 'Home',
    description: 'r-cloud home page',
    alternates: {
      canonical: '/home',
    },
  };
}

interface Props { };

export default function Home({ }: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />
      <TextTag as='h2' weight='600'>
        My R - Drive
      </TextTag>

      <DivCard width='100%' flex_dir='column' gap='1rem' min_height='70vh'>
        <Image
          src='/landing/my-r-drive.svg'
          alt='my-r-drive'
          width={500}
          height={500}
          draggable={false}
        />

        <DivCard width='100%' flex_dir='column' gap='1rem'>
          <DivCard width='100%' flex_dir='column' flex_wrap='nowrap' gap='10px'>
            <TextTag as='p'>
              used space
            </TextTag>

            <ProgressBar progress_in_percentage={25} show_usage_colors width='min(100%, 400px)' height='25px' />
          </DivCard>

          <Button as={Link} href='/home/root' bg='blued'>
            Open Drive
          </Button>
        </DivCard>
      </DivCard>
    </MainTag>
  );
};
