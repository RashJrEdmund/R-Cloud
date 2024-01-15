import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';
import { AuthStateWrapper } from '@/guards/index';

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: 'Home',
    description: 'r-cloud home page',
    alternates: {
      canonical: '/home',
    },
  };
};

interface Props {
  children: React.ReactNode;
};

export default function Home({ children }: Props) {
  return (
    <MainTag>
      <AuthStateWrapper>
        {children}
      </AuthStateWrapper>
    </MainTag>
  );
}
