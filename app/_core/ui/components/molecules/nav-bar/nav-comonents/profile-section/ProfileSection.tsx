'use client';

import Image from 'next/image';
import StyledProfileSection from './StyledProfileSection';
import Link from 'next/link';

interface Props {

};

export default function ProfileSection({ }: Props) {
  return (
    <StyledProfileSection title='user profile image icon'>
      <Link href='/login'>
        <Image
          src='/user_profile_icon.svg'
          alt='user profile image icon'
          width={50}
          height={50}
        />
        Login
      </Link>
    </StyledProfileSection>
  );
};
