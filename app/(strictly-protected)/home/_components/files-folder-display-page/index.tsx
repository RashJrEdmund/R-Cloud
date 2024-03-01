'use client';

/* FILE_PURPOSE +=> ==================================
| Just didn't want to repeat rendering <TopSection /> |
| component in both home/ and home/[...id] routes.    |
| decided to wrap both in a common holder and call    |
| the holder                                          |
=======================================//============*/

import { FilesFolderDisplay, TopSection } from '@/components/molecules';
import { FilesFolderDisplayContextProvider } from '@/store/context';

interface Props {
  //
};

export default function FilesFolderDisplayPage({ }: Props) {
  return (
    <>
      <TopSection />

      <FilesFolderDisplayContextProvider>
        <FilesFolderDisplay />
      </FilesFolderDisplayContextProvider>
    </>
  );
};
