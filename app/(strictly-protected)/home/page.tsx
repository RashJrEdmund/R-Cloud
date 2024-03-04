import { Metadata } from 'next';
import { Button, DivCard, MainTag, TextTag } from '@/components/atoms';
import { ProgressBar, TopSection } from '@/components/molecules';
import Link from 'next/link';

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

      <TextTag>
        My R - Drive
      </TextTag>

      <DivCard width='100%' flex_dir='column'>
        <TextTag >
          used space
        </TextTag>

        <ProgressBar progress_in_percentage={25} show_usage_colors width='min(100%, 400px)' height='25px' />
      </DivCard>

      <Button as={Link} href='/home/folders' bg='blued'>
        Open Drive
      </Button>
    </MainTag>
  );
};
