import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Files',
    description: 'r-cloud files and folders page',
  };
};

interface Props { };

export default function FilesFolders({ }: Props) {
  return (
    <main>
      <h1>FilesFolders page</h1>

      <p>our infinite routing happens here.</p>
    </main>
  );
}
