import './files&folders.css';

export async function generateMetadata() { // to dynamically generate metadata
  return {
    title: 'Files',
    description: 'r-cloud files and folders page',
  };
};

export default function FilesFolders() {
  return (
    <main>
      <h1>FilesFolders page</h1>

      <p>our infinite routing happens here.</p>
    </main>
  );
}
