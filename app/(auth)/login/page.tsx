import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';

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
    <MainTag>
      <h1>Log In</h1>
    </MainTag>
  );
}
