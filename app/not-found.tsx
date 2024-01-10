'use client';

import { MainTag, TextTag } from '@/components/atoms';

interface Props {
  //
};

export default function NotFound({}: Props) {
  return (
    <MainTag justify='center'>
      <TextTag as='h1'>
        Page Not Found
      </TextTag>
    </MainTag>
  );
};
