'use client'

import { useEffect } from 'react';
import { Button, DivCard, TextTag } from '@/components/atoms';
import { UsedSpaceDisplay } from '@/components/molecules';
import Link from 'next/link';
import Image from 'next/image';
import { getTotalUsedSize, getUserProfile } from '@/core/config/firebase/fire-store';
import { useUserStore } from '@/store/zustand';

interface Props { };

export default function DriveDisplay({ }: Props) {
  const { currentUser, userProfile, setUserProfile } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;

    getUserProfile(currentUser.email)
      .then(res => {
        if (!res.exists()) return;
        setUserProfile(res.data());
      })
      .finally(() => { });

    // getTotalUsedSize(currentUser?.email || '').then((res) => {
    //   console.log(res);
    //   console.log('data', res.data());
    // });
  }, [currentUser, setUserProfile]);

  return (
    <DivCard width='100%' flex_dir='column' gap='1rem' min_height='70vh'>
      <Image
        src='/landing/my-r-drive.svg'
        alt='my-r-drive'
        width={500}
        height={500}
        draggable={false}
      />

      <DivCard width='100%' flex_dir='column' gap='1rem'>
        <DivCard width='100%' flex_dir='column' flex_wrap='nowrap' gap='10px'>
          <TextTag as='p'>
            used space
          </TextTag>

          <UsedSpaceDisplay userProfile={userProfile} width='min(100%, 400px)' />
        </DivCard>

        <Button as={Link} href='/r-drive/root' bg='blued'>
          Open Drive
        </Button>
      </DivCard>
    </DivCard>
  );
};
