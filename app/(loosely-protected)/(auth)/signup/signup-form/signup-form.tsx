'use client';

import { FormOrSeparator } from '@/(loosely-protected)/(auth)/_components';
import { InputField } from '@/components/molecules';
import { FormWrapper } from '@/(loosely-protected)/(auth)/_components';
import { Button, TextTag } from '@/components/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { validateCreateAccountForm } from '@/core/services/form-validations';
import { signInOrUpWithGooglePopup, signUpWithCredentials } from '@/core/config/firebase';
import { useRouter } from 'next/navigation';
import { createUserProfile, getOneStoragePlan } from '@/core/config/firebase/fire-store';

import type { MouseEventHandler } from 'react';
import type { IFieldErrors } from '@/core/services/form-validations/form-interfaces';
import type { IUserProfile } from '@/interfaces/entities';
import type { User } from 'firebase/auth';

interface Props {
  //
};

export default function SignUpForm({ }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IFieldErrors | null>(null);
  const [formStatus, setFormStatus] = useState<{ status: number, message: string } | null>(null);
  const router = useRouter();

  const handleCreateUserProfile = async (user: User | undefined, extra_data: { [key: string]: string } | null = null) => {
    const res = await getOneStoragePlan('0'); // 0 is Id of default storage plan;

    if (!res.exists()) return;

    setFormStatus({ status: 200, message: 'Account created, setting up user profile...' });

    const plan = res.data();

    const userProfile: IUserProfile = {
      id: user?.uid || '',
      email: user?.email || '',
      date_of_birth: extra_data?.date_of_birth || '',
      phone_number: '', // extra_data?.phone_number, // TODO +=> ADD phone_number: extra_data
      plan: {
        id: res.id,
        is_free: plan.is_free,
        total_capacity: plan.capacity,
        unit: plan.unit,
        used_space: 0,
      },
    };

    await createUserProfile(userProfile);

    setFormStatus({ status: 200, message: `welcome to r-cloud, ${user?.displayName || user?.email?.split('@').shift() || 'new user'}` });
    router.push('/home');
  };

  const handleGoogleSignUp: MouseEventHandler<HTMLButtonElement> = () => {
    signInOrUpWithGooglePopup()
      .then(handleCreateUserProfile); // passes 1 parameter. user: User.
  };

  const signUpFormAction = (formData: FormData) => {
    setLoading(true);
    setErrors(null);
    setFormStatus({ status: 200, message: 'Creating account...' });

    const rawData = Object.fromEntries(formData.entries());
    rawData.date_of_birth = new Date(rawData?.date_of_birth as any || '') as any; // ensuring date is in date format

    const validation = validateCreateAccountForm(rawData as { [key: string]: string });

    if (validation.errors) {
      setFormStatus({ status: 401, message: validation.message || '' });
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // API CALL.
    signUpWithCredentials(
      validation.data?.email || '',
      validation.data?.password || '',
      validation.data as any
    ).then((user) => handleCreateUserProfile(user, validation?.data as { [key: string]: string }))
      .catch(er => {
        setFormStatus({ status: 401, message: 'Could not create account. Try again or use another method' });
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

      {formStatus ? (
        <TextTag as='p' color_type={formStatus.status === 200 ? 'success' : 'error'} text_align='left' size='0.9rem'>
          {formStatus.message}
        </TextTag>
      ) : null}

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

      <Button
        type='submit'
        bg='blued'
        width='100%'
        padding='7px 0'
        cursor={loading ? 'not-allowed' : 'pointer'}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Sign Up'}
      </Button>

      <FormOrSeparator />

      <Button type='button' bg='light' width='100%' padding='7px 0' onClick={handleGoogleSignUp}>
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
