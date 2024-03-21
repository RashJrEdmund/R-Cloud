'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { DivCard, TextTag } from '@/components/atoms';
import StyledFileFolderDisplay from './styled-file-folder-display';
import { useDocStore, useAppStore } from '@/store/zustand';
import { useContextMenuContext, useModalContext } from '@/store/context';
import {
  GridFileCard, GridFolderCard,
  ListFileCard, ListFolderCard,
} from './components';
import { getResponsiveMenuPosition, openFileUploadDialog } from '@/utils/helpers';

import type { DragEventHandler, MouseEventHandler } from 'react';
import type { ContextMenuContent } from '@/interfaces/app';
import { CONTEXT_MENU_ICONS } from '@/core/ui/icons';

interface Props {
  //
};

export default function FilesFolderDisplay({ }: Props) {
  const { documents, currentFolder } = useDocStore();
  const { displayLayout } = useAppStore();

  const { readyUploadModal, openNewFolderModal } = useModalContext();

  const {
    setContextCoordinates,
    setContextContent,
    contextMenuRef,

    selectionStart,
    stopDocumentSelection,
  } = useContextMenuContext();

  const MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(() => selectionStart ? [
    {
      text: 'Delete Selected',
      icon_url: CONTEXT_MENU_ICONS.delete,
      action: () => null,
    },
    {
      text: 'Stop Selection',
      icon_url: CONTEXT_MENU_ICONS.select,
      action: stopDocumentSelection,
    }
  ] : [
    {
      text: 'New Folder',
      icon_url: CONTEXT_MENU_ICONS.new_folder,
      action: openNewFolderModal,
    },
    {
      text: 'Upload File(s)',
      icon_url: CONTEXT_MENU_ICONS.upload,
      action: openFileUploadDialog,
    },
  ], [selectionStart]);

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const coordinates = getResponsiveMenuPosition(e as any as MouseEvent);
    setContextCoordinates({ top: coordinates.y + 'px', left: coordinates.x + 'px' });

    setContextContent(MAIN_CONTEXT_MENU_CONTENT);

    contextMenuRef?.current?.open();
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
        // bg='light'
        width='100%'
        flex_dir='column'
        justify='start'
        min_height='80vh'
        onContextMenu={handleContextMenu}

        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        <TextTag color_type='grayed' sx='word-break: break-all;'>
          {currentFolder === 'root' ? 'root' : currentFolder.name}
        </TextTag>
        {
          documents ? (
            (documents.length > 0) ? (
              <StyledFileFolderDisplay
                className={displayLayout.toLowerCase() + '-layout'} // e.g grid-layout or list-layout
              >
                {
                  displayLayout === 'GRID' ? (
                    documents.map((doc) => (
                      doc.type === 'FOLDER' ? (
                        <GridFolderCard key={doc.id} doc={doc} />
                      ) : (
                        <GridFileCard key={doc.id} doc={doc} />
                      )
                    ))
                  ) : (
                    documents.map((doc) => (
                      doc.type === 'FOLDER' ? (
                        <ListFolderCard key={doc.id} doc={doc} />
                      ) : (
                        <ListFileCard key={doc.id} doc={doc} />
                      )
                    ))
                  )
                }
              </StyledFileFolderDisplay>
            ) : (
              <DivCard width='100%' min_height='60vh'>
                <TextTag as='h3' weight='600' size='2rem' color_type='grayed'>
                  Folder Is Empty
                </TextTag>
              </DivCard>
            )
          ) : null
        }
      </DivCard>
    </>
  );
};
