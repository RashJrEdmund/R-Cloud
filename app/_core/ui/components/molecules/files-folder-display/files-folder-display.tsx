'use client';

import { MouseEventHandler, useRef, useState } from 'react';
import { DivCard } from '@/components/atoms';
import { FileCard, FolderCard } from './components';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore } from '@/store/zustand';
import { ContextMenu } from '@/components/modals';
import { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';

interface Props {
  content?: IDocument[]; // from path wrapper
};

export default function FilesFolderDisplay({ }: Props) {
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{ top: string; left: string; }>({ top: '', left: '' });
  const { documents } = useDocStore();
  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const handleContextMenu: MouseEventHandler = (e) => {
    e.preventDefault();
    contextMenuRef?.current?.open();

    setContextMenuCoordinates({
      top: e.clientY + 'px',
      left: e.clientX + 'px',
    });
  };

  return (
    <>
      <ContextMenu
        ref={contextMenuRef}
        top={contextMenuCoordinates.top}
        left={contextMenuCoordinates.left}
      />

      <DivCard
        // bg='light'
        width='100%'
        flex_wrap='wrap'
        align='start'
        min_height='80vh'
        onContextMenu={handleContextMenu}
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
    </>
  );
};
