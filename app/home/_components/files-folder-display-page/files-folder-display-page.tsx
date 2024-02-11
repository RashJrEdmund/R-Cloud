'use client';

import { TopSectionHolder } from '@/components/atoms';
import { FilesFolderDisplay, Navigator } from '@/components/molecules';

interface Props {
  //
};

export default function FilesFolderDisplayPage({ }: Props) {
  return (
    <>
      {/* TODO +=> ADD SEARCH BAR COMPONENT AND NAVIGATOR HERE. */}
      <TopSectionHolder>
        <Navigator />
      </TopSectionHolder>

      <FilesFolderDisplay />
    </>
  );
};
