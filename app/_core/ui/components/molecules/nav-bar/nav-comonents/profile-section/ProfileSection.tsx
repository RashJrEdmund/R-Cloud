'use client';

import Image from 'next/image';
import StyledProfileSection from './StyledProfileSection';
import Link from 'next/link';
import { useUserStore } from '@/store/zustand';
import { useMemo } from 'react';
import { TextTag } from '@/components/atoms';

interface Props {

};

export default function ProfileSection({ }: Props) {
  const { currentUser } = useUserStore();

  const profile_url = useMemo(() => {
    return (currentUser && currentUser.photo_url) ? currentUser.photo_url : '/user_profile_icon.svg';
  }, [currentUser]);

  return (
    !currentUser ? (
      <StyledProfileSection title='you are currently not logged in'>
        <Link href='/login'>
          <Image
            src={profile_url}
            alt='you are currently not logged in'
            width={50}
            height={50}
          />
          <TextTag>Login</TextTag>
        </Link>
      </StyledProfileSection>
    ) : (
      <StyledProfileSection title={`logged in as ${currentUser.username}`}>
        <Link href='/profile'>
          <Image
            src={profile_url}
            alt='user profile image icon'
            width={50}
            height={50}
          />
          <TextTag>{currentUser.username}</TextTag>
        </Link>
      </StyledProfileSection>
    )
  );
};
