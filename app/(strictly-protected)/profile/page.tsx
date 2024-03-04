import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';
import { TopSection } from '@/components/molecules';
import { ProfileDisplay } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: 'Profile',
    description: 'r-cloud profile page',
    alternates: {
      canonical: '/profile',
    },
  };
}

interface Props { };

export default function Profile({ }: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />

      <ProfileDisplay />
    </MainTag>
  );
}
