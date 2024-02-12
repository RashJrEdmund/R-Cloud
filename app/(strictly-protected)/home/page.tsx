import { Metadata } from 'next';
import { FilesFolderDisplayPage } from './_components';

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
  return <FilesFolderDisplayPage />;
};
