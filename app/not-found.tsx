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

      <Link href='/'> {/* TODO +=> Add replace functionality to this link */}
        <Button bg='black' padding='10px 15px'>
          Go Home
        </Button>
      </Link>
    </MainTag>
  );
};
