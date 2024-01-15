'use client';

import Image from 'next/image';
import StyledProfileSection from './StyledProfileSection';
import Link from 'next/link';
import { useUserStore } from '@/store/zustand';
import { useMemo } from 'react';

interface Props {

};

export default function ProfileSection({ }: Props) {
  const { currentUser } = useUserStore();

  const profile_url = useMemo(() => {
    return (currentUser && currentUser.photo_url) ? currentUser.photo_url : '/user_profile_icon.svg';
  }, [currentUser]);

  return (
    <StyledProfileSection title='user profile image icon'>
      <Link href='/login'>
        <Image
          src={profile_url}
          alt='user profile image icon'
          width={50}
          height={50}
        />
        Login
      </Link>
    </StyledProfileSection>
  );
};
