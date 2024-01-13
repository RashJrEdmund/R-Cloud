'use client';

import { FormOrSeperator, InputField } from '@/(auth)/_components';
import { FormWrapper } from '@/(auth)/_components';
import { loginWithEmailAndPass } from '@/_core/config/firebase';
import { Button, TextTag } from '@/components/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  //
};

interface Props {
  //
};

export default function LoginForm({ }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginFormAction = (formData: FormData) => {
    console.log(formData);
    setLoading(true);

    const rawData = {
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
    };

    console.log({ rawData });

    if (!rawData.email?.trim() || !rawData.password?.trim()) return; // toast error;

    loginWithEmailAndPass(rawData.email, rawData.password)
      .then((user) => {
        console.log("use ''", user);
        // if (user) router.push('/home');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormWrapper
      img_url='login-img.svg'
      formAction={loginFormAction}
    >
      <TextTag as='h1' size='2rem' weight='600'>
        Log In
      </TextTag>

      <TextTag as='p' color_type='grayed'>
        Please login to continue to your account
      </TextTag>

      <InputField
        field_title='Email'
        field_name='email'
      />

      <InputField
        field_title='Password'
        field_name='password'
        type='password'
      />

      <label htmlFor='keep-me-logged-in' className='keep-me-logged-in'>
        <input type='checkbox' name='keep-me-logged-in' id='keep-me-logged-in' />
        keep me logged in
      </label>

      <Button type='submit' bg='blued' width='100%' padding='7px 0' disabled={loading}>
        {loading ? 'loading...' : 'Sign In'}
      </Button>

      <FormOrSeperator />

      <Button type='button' bg='light' width='100%' padding='7px 0'>
        Sign in with Google
        <Image src='/icons/google-icon.svg' alt='google icon' height={25} width={25} />
      </Button>

      <TextTag color_type='grayed' margin='10px auto' sx='align-self: center;'>
        Don&apos;t have an account?

        <Link href='/signup'>
          <TextTag color_type='success' cursor='pointer'>Create One</TextTag>
        </Link>
      </TextTag>
    </FormWrapper>
  );
};
