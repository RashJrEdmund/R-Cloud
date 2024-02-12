'use client';

import { TextTag } from '@/components/atoms';
import { useUserStore } from '@/store/zustand';
import { useMemo } from 'react';
import StyledProfileImage from './styled-profile-image';
import Image from 'next/image';

interface Props {
  //
};

export default function ProfileImage({ }: Props) {
  const { currentUser } = useUserStore();

  const profile_url = useMemo(() => {
    return (currentUser && currentUser.photo_url) ? currentUser.photo_url : '/user_profile_icon.svg';
  }, [currentUser]);

  return (
    <StyledProfileImage>
      <Image
        src={profile_url}
        alt={`image of ${currentUser?.username}`}
        width={250}
        height={250}
      />

      <TextTag no_white_space>
        <Image
          src='/icons/modal-icons/upload-icon.svg'
          alt={`image of ${currentUser?.username}`}
          width={17}
          height={17}
        />
        upload image
      </TextTag>
    </StyledProfileImage>
  );
};
