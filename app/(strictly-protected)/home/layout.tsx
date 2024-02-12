import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';
import { StrictAuthGuard } from '@/guards/index'; //r-cloud.vercel.app

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
      <StrictAuthGuard> {/* TODO +=> WORK ON OR REMOVE THIS AUTH STATE GUARD. INSTEAD CREATE A LOOSE AUTHGUARD AND A STRICT AUTHGUARD */}
        {children}
      </StrictAuthGuard>
    </MainTag>
  );
}
