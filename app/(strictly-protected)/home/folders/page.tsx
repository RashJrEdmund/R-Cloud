import { Metadata } from 'next';
import { FilesFolderDisplayPage } from './_components';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Files & Folders',
    description: 'r-cloud base folders',
    alternates: {
      canonical: '/home/folders',
    },
  };
};

interface Props { };

export default function FilesFolders({ }: Props) {
  return <FilesFolderDisplayPage />;
};
