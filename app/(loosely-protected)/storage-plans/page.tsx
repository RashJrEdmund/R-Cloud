import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';
import { TopSection } from '@/components/molecules';
import PlanDisplay from './_components/storage-plans';

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: 'Storage Plans',
    description: 'r-cloud storage plans page',
    alternates: {
      canonical: '/storage-plans',
    },
  };
}

interface Props { };

export default function StoragePlans({ }: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />

      <PlanDisplay />
    </MainTag>
  );
}
