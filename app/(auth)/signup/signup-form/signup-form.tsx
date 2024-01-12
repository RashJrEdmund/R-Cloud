'use client';

import { FormOrSeperator, InputField } from '@/(auth)/_components';
import { FormWrapper } from '@/(auth)/_components';
import { Button, TextTag } from '@/components/atoms';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  //
};

export default function SignupForm({ }: Props) {
  const signupFormAction = (formData: FormData) => {
    console.log(formData);

    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const rawData2 = Object.fromEntries(formData.entries());

    console.log(formData);
    console.log(formData.entries());
    console.log(Object.fromEntries(formData));

    console.log({ rawData, rawData2 });
  };

  return (
    <FormWrapper
      img_url='signup-img.svg'
      formAction={signupFormAction}
    >
      <TextTag as='h1' size='2rem' weight='600'>
        Create Account
      </TextTag>

      <TextTag as='p' color_type='grayed'>
        Create an account to get started
      </TextTag>

      <InputField
        field_title='Your Name'
        field_name='name'
      />

      <InputField
        field_title='Date of Birth'
        field_name='date-of-birth'
        type='date'
        leave_active
      />

      <InputField
        field_title='Email'
        field_name='email'
      />

      <InputField
        field_title='Password'
        field_name='password'
      />

      <Button type='submit' bg='blued' width='100%' padding='7px 0'>Sign Up</Button>

      <FormOrSeperator />

      <Button type='button' bg='light' width='100%' padding='7px 0'>
        Continue in with Google
        <Image src='/icons/google-icon.svg' alt='google icon' height={25} width={25} />
      </Button>

      <TextTag color_type='grayed' margin='10px auto' sx='align-self: center;'>
        Already have an account ??

        <Link href='/login'>
          <TextTag color_type='success' cursor='pointer'>Sign In</TextTag>
        </Link>
      </TextTag>
    </FormWrapper>
  );
};
