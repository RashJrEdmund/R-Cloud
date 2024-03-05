import { Metadata } from 'next';
import { FilesFolderDisplayPage } from './_components';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Root',
    description: 'r-cloud base root directory',
    alternates: {
      canonical: '/home/root',
    },
  };
};

interface Props { };

export default function FilesFolders({ }: Props) {
  return <FilesFolderDisplayPage />;
};
