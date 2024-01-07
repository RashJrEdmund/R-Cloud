import './home.css';

export async function generateMetadata() {
  // to dynamically generate metadata
  return {
    title: 'Home',
    description: 'r-cloud home page',
    alternates: {
      canonical: '/home',
    },
  };
}

export default function Home() {
  return (
    <main>
      <h1>Home page</h1>
    </main>
  );
}
