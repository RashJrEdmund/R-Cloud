import { Metadata } from 'next';
import HomePage from './_page/home-page';

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
  return <HomePage />;
};
