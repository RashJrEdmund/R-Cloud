import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Login',
    description: 'r-cloud login page',
    alternates: {
      canonical: '/login'
    }
  };
};

interface Props {};

export default function Login({}: Props) {
  return (
    <main>
      <h1>Log In</h1>
    </main>
  );
}
