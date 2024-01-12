import { Metadata } from 'next';
import {
  Button,
  MainTag,
  TextTag
} from '@/components/atoms';
import {
  InputField
} from '@/components/molecules';
import { FormWrapper } from '../_components';

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
      <FormWrapper
        img_url='login-img.svg'
      >
        <TextTag as='h1' size='2rem' weight='600'>
          Log In
        </TextTag>

        <TextTag as='p' color_type='grayed'>
          Please login to continue to your account
        </TextTag>

        <label htmlFor='keep-me-logged-in'>
          <input type='checkbox' name='keep-me-logged-in' id='keep-me-logged-in' />
          keep me logged in
        </label>

        <input placeholder='password' />

        <InputField />

        <Button type='submit' bg='blued' width='100%'>Sign In</Button>
      </FormWrapper>
    </MainTag>
  );
}
