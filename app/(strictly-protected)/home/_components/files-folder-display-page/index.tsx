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
      {/* INPUT_DES +=> ===========================================================
      | This is a special input field. The one used to open the select file dialog |
      | in the FilesFolderDisplay component                                        |
      ================================================================//=========*/}
      <input hidden multiple type='file' id='file-upload-field' />

      <TopSection />

      <FilesFolderDisplayContextProvider>
        <FilesFolderDisplay />
      </FilesFolderDisplayContextProvider>
    </>
  );
};
