import { Metadata } from 'next';
import { MainTag } from '@/components/atoms';
import { FormWrapper } from '../_components';

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
    <MainTag justify='center'>
      <FormWrapper
        img_url='signup-img.svg'
      >
        <h1>Sign up</h1>
      </FormWrapper>
    </MainTag>
  );
}
