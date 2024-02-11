'use client';

import { DivCard } from '@/components/atoms';
import { FileCard, FolderCard } from './components';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore } from '@/store/zustand';

interface Props {
  //
};

export default function FilesFolderDisplay({ }: Props) {
  const { documents } = useDocStore();

  return (
    <DivCard
      bg='light'
      width='100%'
      flex_wrap='wrap'
      align='start'
      min_height='80vh'
    >
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
    </DivCard>
  );
};
