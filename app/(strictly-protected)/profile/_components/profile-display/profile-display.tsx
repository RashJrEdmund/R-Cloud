'use client';

import { Button, DivCard, TextTag } from '@/components/atoms';
import { useUserStore } from '@/store/zustand';
import { useMemo, useState } from 'react';
import StyledProfileDisplay from './styled-profile-display';
import { ProfileImage } from '..';
import { useRouter } from 'next/navigation';
import { logOut } from '@/core/config/firebase';

interface Props {
  //
};

export default function ProfileDisplay({ }: Props) {
  const { currentUser, setCurrentUser } = useUserStore();

  const [logOutState, setLogOutState] = useState<{ isLoading: boolean; message: string } | null>(null);

  const router = useRouter();

  const LastLogin = useMemo(() => new Date((currentUser?.metadata?.lastSignInTime as any)).toDateString(), [currentUser]);

  const handleLogOut = () => {
    setLogOutState({
      isLoading: true,
      message: 'Login out'
    });

    logOut().then(() => {
      setCurrentUser(null);
      router.replace('/');
    }).finally(() => {
      setLogOutState(null);
    });
  };

  return (
    <StyledProfileDisplay>
      <ProfileImage />

      <DivCard width='100%' flex_wrap='wrap' justify='start' gap='1rem'>
        <TextTag size='0.9rem' no_white_space>
          Logged In as:

          <TextTag color_type='success'>
            {currentUser?.username}
          </TextTag>
        </TextTag>

        <TextTag size='0.9rem' no_white_space>
          Current Plan

          <TextTag color_type='success'>
            1 Gb at 0 XAF / Month (Free Tier)
          </TextTag>
        </TextTag>
      </DivCard>

      <DivCard width='100%' flex_dir='column' align='start' justify='start'>
        <TextTag size='0.9rem'>
          username

          <TextTag color_type='success'>
            {currentUser?.username}
          </TextTag>
        </TextTag>

        <TextTag size='0.9rem'>
          email

          <TextTag color_type='success'>
            {currentUser?.email}
          </TextTag>
        </TextTag>

        <TextTag size='0.9rem'>
          Phone Number

          <TextTag color_type='success'>
            {currentUser?.phone_number || 'None Provided'}
          </TextTag>
        </TextTag>

        <TextTag size='0.9rem'>
          Last Log in

          <TextTag color_type='success'>
            {LastLogin}
          </TextTag>
        </TextTag>
      </DivCard>

      <DivCard width='100%' align='start' justify='start'>
        <Button
          bg='black'
          disabled={logOutState?.isLoading}
          cursor={logOutState?.isLoading ? 'not-allowed' : 'pointer'}
          onClick={handleLogOut}
        >
          {logOutState?.isLoading ? logOutState?.message : 'Log out'}
        </Button>
      </DivCard>
    </StyledProfileDisplay>
  );
};
