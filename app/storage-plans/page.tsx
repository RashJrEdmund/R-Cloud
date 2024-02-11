import { Metadata } from 'next';
import { MainTag, TopSectionHolder } from '@/components/atoms';
import { Navigator } from '@/components/molecules';
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
      <TopSectionHolder>
        <Navigator />
      </TopSectionHolder>

      <PlanDisplay />
    </MainTag>
  );
}
