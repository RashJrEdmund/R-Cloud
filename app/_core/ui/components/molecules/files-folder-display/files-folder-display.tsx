'use client';

import { useEffect, useCallback } from 'react';
import { DivCard } from '@/components/atoms';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore, useAppStore } from '@/store/zustand';
import { useFilesFolderDisplayContext } from '@/store/context';
import {
  GridFileCard, GridFolderCard,
  ListFileCard, ListFolderCard
} from './components';
import { openFileUploadDialog } from '@/utils/helpers';

import type { DragEventHandler, MouseEventHandler } from 'react';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props {
  //
};

const MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[] = [
  {
    text: 'New Folder',
    icon_url: '/icons/modal-icons/new-folder-icon.svg',
    action: () => null,
  },
  {
    text: 'Upload File(s)',
    icon_url: '/icons/modal-icons/upload-icon.svg',
    action: openFileUploadDialog,
  },
];

export default function FilesFolderDisplay({ }: Props) {
  const { documents } = useDocStore();
  const { displayLayout } = useAppStore();
  const {
    contextMenuRef,
    setContextCoordinates,
    setContextContent,
    readyUploadModal,
  } = useFilesFolderDisplayContext();

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

  // DRAG_DROP_HANDLERS_STARTS_HERE!

  const handleDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const { files, items } = e.dataTransfer;

    readyUploadModal(files, items);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  // DRAG_DROP_HANDLERS_ENDS_HERE!

  const handleFileUploadInputFieldData = useCallback<(e: Event) => void>((e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    readyUploadModal(files);
  }, []);

  useEffect(() => {
    const fileUploadField = document.querySelector<HTMLInputElement>('#file-upload-field');

    if (!fileUploadField) return;

    fileUploadField.addEventListener('change', handleFileUploadInputFieldData, false);

    return () => {
      fileUploadField.removeEventListener('change', handleFileUploadInputFieldData, false);
    };
  }, [handleFileUploadInputFieldData]);

  return (
    <>
      <DivCard
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
