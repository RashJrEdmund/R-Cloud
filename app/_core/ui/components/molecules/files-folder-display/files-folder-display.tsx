/* eslint-disable @next/next/no-async-client-component */
'use client';

import { FileCard, FolderCard } from './components';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore } from '@/store/zustand';

interface Props {
  //
};

export default async function FilesFolderDisplay({ }: Props) {
  const { documents } = useDocStore();

  await new Promise(resolve => setTimeout(resolve, 5000));

  return (
    <StyledFileFolderDisplay>
      {
        documents?.map((doc) => (
          doc.type === 'FOLDER' ? (
            <FolderCard key={doc.id} doc={doc} />
          ) : (
            <FileCard key={doc.id} doc={doc} />
          )
        ))
      }
    </StyledFileFolderDisplay>
  );
};
