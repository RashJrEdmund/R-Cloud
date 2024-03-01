'use client';

import { DragEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { DivCard } from '@/components/atoms';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore, useAppStore } from '@/store/zustand';
import { useFilesFolderDisplayContext } from '@/store/context';
import {
  GridFileCard, GridFolderCard,
  ListFileCard, ListFolderCard
} from './components';

import type { IDocument } from '@/interfaces/entities';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props {
  content?: IDocument[]; // from path wrapper
};

const MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[] = [
  {
    text: 'New Folder',
    icon_url: '/icons/modal-icons/new-folder-icon.svg',
    action: () => null,
  },
  {
    text: 'Upload File',
    icon_url: '/icons/modal-icons/upload-icon.svg',
    action: () => null,
  },
];

export default function FilesFolderDisplay({ }: Props) {
  const { documents } = useDocStore();
  const { displayLayout } = useAppStore();
  const { contextMenuRef, setContextCoordinates, setContextContent } = useFilesFolderDisplayContext();

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    contextMenuRef?.current?.open();

    setContextContent(MAIN_CONTEXT_MENU_CONTENT);

    setContextCoordinates({
      top: e.clientY + 'px',
      left: e.clientX + 'px',
    });
  };

  const handleDragStart: DragEventHandler<HTMLDivElement>  = (e) => {
    e.preventDefault();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement>  = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement>  = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    const items = e.dataTransfer.items;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log(file.size);
    };

    console.log(files, items);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement>  = (e) => {
    e.preventDefault();
  };

  return (
    <DivCard
      // bg='light'
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
  );
};
