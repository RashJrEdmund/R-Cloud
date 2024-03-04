'use client';

import { MainTag, TextTag, Button } from '@/components/atoms';
import Link from 'next/link';

interface Props {
  //
};

export default function NotFound({ }: Props) {
  return (
    <MainTag justify='center'>
      <TextTag as='h1'>
        Page Not Found
      </TextTag>

      <Button as={Link} href='/' bg='black' padding='10px 15px'
        replace // replace attribute is for the Link. like router.replace('/path');
      > 
        Go Back
      </Button>
    </MainTag>
  );
};
