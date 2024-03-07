'use client'

import { useEffect } from 'react';
import { Button, DivCard, TextTag } from '@/components/atoms';
import { ProgressBar } from '@/components/molecules';
import Link from 'next/link';
import Image from 'next/image';
import { getTotalUsedSize } from '@/core/config/firebase/fire-store';
import { useUserStore } from '@/store/zustand';

interface Props { };

export default function DriveDisplay({ }: Props) {
  const { currentUser } = useUserStore();

  useEffect(() => {
    getTotalUsedSize(currentUser?.email || '').then((res) => {
      console.log(res);
      console.log('data', res.data());
    });
  }, []);

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

          <ProgressBar progress_in_percentage={25} show_usage_colors width='min(100%, 400px)' height='25px' />
        </DivCard>

        <Button as={Link} href='/r-drive/root' bg='blued'>
          Open Drive
        </Button>
      </DivCard>
    </DivCard>
  );
};
