'use client';

import { DragEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { DivCard } from '@/components/atoms';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore, useAppStore } from '@/store/zustand';
import { ContextMenu } from '@/components/modals';
import { IModalWrapperRef } from '@/components/modals/generics';
import {
  GridFileCard, GridFolderCard,
  ListFileCard, ListFolderCard
} from './components';

import type { IDocument } from '@/interfaces/entities';

interface Props {
  content?: IDocument[]; // from path wrapper
};

export default function FilesFolderDisplay({ }: Props) {
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState<{ top: string; left: string; }>({ top: '', left: '' });
  const { documents } = useDocStore();
  const { displayLayout } = useAppStore();
  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const handleContextMenu: MouseEventHandler = (e) => {
    e.preventDefault();
    contextMenuRef?.current?.open();

    setContextMenuCoordinates({
      top: e.clientY + 'px',
      left: e.clientX + 'px',
    });
  };

  const handleDragStart: DragEventHandler = (e) => {
    e.preventDefault();
  };

  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    const items = e.dataTransfer.items;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log(file.size);
    };

    console.log(files, items);
  };

  const handleDragEnd: DragEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ContextMenu
        ref={contextMenuRef}
        top={contextMenuCoordinates.top}
        left={contextMenuCoordinates.left}
      />

      <DivCard
        bg='light'
        width='100%'
        flex_wrap='wrap'
        align='start'
        min_height='80vh'
        onContextMenu={handleContextMenu}

        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        <StyledFileFolderDisplay
          className={displayLayout.toLowerCase() + '-layout'} // e.g grid-layout or list-layout
        >
          {
            displayLayout === 'GRID' ? (
              documents?.map((doc) => (
                doc.type === 'FOLDER' ? (
                  <GridFolderCard key={doc.id} doc={doc} />
                ) : (
                  <GridFileCard key={doc.id} doc={doc} />
                )
              ))
            ) : (
              documents?.map((doc) => (
                doc.type === 'FOLDER' ? (
                  <ListFolderCard key={doc.id} doc={doc} />
                ) : (
                  <ListFileCard key={doc.id} doc={doc} />
                )
              ))
            )
          }
        </StyledFileFolderDisplay>
      </DivCard>
    </>
  );
};
