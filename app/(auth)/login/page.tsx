import { Metadata } from 'next';
import {  MainTag } from '@/components/atoms';

import LoginForm from './login-form/login-form';

export async function generateMetadata(): Promise<Metadata> { // to dynamically generate metadata
  return {
    title: 'Login',
    description: 'r-cloud login page',
    alternates: {
      canonical: '/login'
    }
  };
};

interface Props { };

export default function Login({ }: Props) {
  return (
    <MainTag justify='center'>
      <LoginForm />
    </MainTag>
  );
};
