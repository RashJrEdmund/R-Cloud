'use client';

import { Button, DivCard, TextTag } from '@/components/atoms';
import { useUserStore } from '@/store/zustand';
import { useEffect, useMemo, useState } from 'react';
import StyledProfileDisplay from './styled-profile-display';
import { ProfileImage } from '..';
import { useRouter } from 'next/navigation';
import { logOut } from '@/core/config/firebase';
import { getUserProfile } from '@/core/config/firebase/fire-store';
import { UsedSpaceDisplay } from '@/components/molecules';

interface Props {
  //
};

export default function ProfileDisplay({ }: Props) {
  const { currentUser, setCurrentUser, userProfile, setUserProfile } = useUserStore();

  const [logOutState, setLogOutState] = useState<{ isLoading: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    if (!currentUser) return;
    getUserProfile(currentUser.email)
      .then(res => {
        if (!res.exists()) return;

        const profile = res.data();
        setUserProfile(profile);
      })
      .catch(() => router.push('/r-drive'))
      .finally(() => setLoading(false));
  }, []);

  // console.log('user bytes', userProfile && calculatePercentage(userProfile?.plan.used_bytes, userProfile?.plan.bytes));

  return (
    <StyledProfileDisplay>
      <ProfileImage />

      <DivCard width='100%' flex_wrap='wrap' justify='start' gap='1rem'>
        {(!loading || currentUser)? (
          <>
            <TextTag size='0.9rem' no_white_space>
              Logged In as:

              <TextTag color_type='success'>
                {currentUser?.username}
              </TextTag>
            </TextTag>

            <TextTag size='0.9rem' no_white_space>
              Current Plan

              <TextTag color_type='success'>
                {userProfile?.plan.label}
              </TextTag>
            </TextTag>

            <DivCard width='100%' flex_dir='row' align='start' justify='start' gap='7px'>
              <TextTag size='0.9rem' no_white_space>
                Plan Capacity
              </TextTag>

              <DivCard flex_wrap='wrap' justify='start'>
                <TextTag no_white_space color_type='success'>
                  {userProfile?.plan.capacity} at
                </TextTag>

                <TextTag no_white_space color_type='success'>
                  {userProfile?.plan.rate}
                  ({userProfile?.plan.is_free ? 'Free' : 'Paid'} Tier)
                </TextTag>
              </DivCard>
            </DivCard>
          </>
        ) : (
          <TextTag no_white_space>getting profile...</TextTag>
        )}
      </DivCard>

      {/* <pre>
        {JSON.stringify(userProfile, null, 4)}
      </pre> */}

      <UsedSpaceDisplay userProfile={userProfile} />

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
