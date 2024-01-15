import { Metadata } from 'next';
import FilesFoldersPage from './_page/files-&-folders';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Files & Folders',
    description: 'r-cloud files and folders page',
  };
};

interface Props { };

export default function FilesFolders({ }: Props) {
  return <FilesFoldersPage />;
}

