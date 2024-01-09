import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Signup',
    description: 'r-cloud signup page',
    alternates: {
      canonical: '/signup'
    }
  };
};

interface Props {};

export default function Signup({}: Props) {
  return (
    <main>
      <h1>Sign up</h1>
    </main>
  );
}
