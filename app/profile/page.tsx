import { Metadata } from 'next';
import { MainTag, TopSectionHolder } from '@/components/atoms';
import { Navigator } from '@/components/molecules';

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
      <TopSectionHolder>
        <Navigator />
      </TopSectionHolder>

      <h1>Your Profile</h1>
    </MainTag>
  );
}
