'use client';

import { FormOrSeparator } from '@/(loosely-protected)/(auth)/_components';
import { InputField } from '@/components/molecules';
import { FormWrapper } from '@/(loosely-protected)/(auth)/_components';
import { Button, TextTag } from '@/components/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { validateCreateAccountForm } from '@/core/services/form-validations';
import { signUpWithCredentials } from '@/core/config/firebase';
import { useRouter } from 'next/navigation';
import type { IFieldErrors } from '@/core/services/form-validations/form-interfaces';

interface Props {
  //
};

export default function SignUpForm({ }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IFieldErrors | null>(null);
  const router = useRouter();

  const signUpFormAction = (formData: FormData) => {
    setLoading(true);
    setErrors(null);

    const rawData = Object.fromEntries(formData.entries());
    rawData.date_of_birth = new Date(rawData?.date_of_birth as any || '') as any; // ensuring date is in date format

    const validation = validateCreateAccountForm(rawData as { [key: string]: string });

    if (validation.errors) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // API CALL.
    signUpWithCredentials(
      validation.data?.email || '',
      validation.data?.password || '',
      validation.data as any
    ).then((user) => {
      router.push('/home');
    }).catch(er => {
      //
    }).finally(() => {
      setLoading(false);
    });

  };

  return (
    <FormWrapper
      img_url='signup-img.svg'
      formAction={signUpFormAction}
    >
      <TextTag as='h1' size='2rem' weight='600'>
        Create Account
      </TextTag>

      <TextTag as='p' color_type='grayed' text_align='left'>
        Create an account to get started
      </TextTag>

      <InputField
        field_title='Your Name'
        field_name='username'
        error={errors?.username}
      />

      <InputField
        field_title='Date of Birth'
        field_name='date_of_birth'
        error={errors?.date_of_birth as string}
        type='date'
        leave_active
      />

      <InputField
        field_title='Email'
        field_name='email'
        error={errors?.email}
      />

      <InputField
        field_title='Password'
        field_name='password'
        error={errors?.password}
      />

      <InputField
        field_title='Confirm password'
        field_name='confirm_password'
        error={errors?.confirm_password}
      />

      <Button type='submit' bg='blued' width='100%' padding='7px 0' disabled={loading}>
        {loading ? 'loading...' : 'Sign Up'}
      </Button>

      <FormOrSeparator />

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
