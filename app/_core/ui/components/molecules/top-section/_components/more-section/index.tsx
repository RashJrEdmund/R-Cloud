'use client';

import { useRef, useMemo, useState, MouseEventHandler, useEffect } from 'react';
import { DivCard, TextTag } from '@/components/atoms';
import { ContextMenu } from '@/components/modals';
import { getResponsiveMenuPosition, openFileUploadDialog } from '@/utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useContextMenuContext, useModalContext } from '@/store/context';

import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props {
  //
};

export default function MoreSection({ }: Props) {
  const contextMenuRef = useRef<IModalWrapperRef>(null);
  const [coordinates, setCoordinates] = useState<{ top: string, left: string }>({ top: '-10px', left: '-10px' });

  const { openNewFolderModal } = useModalContext();

  const {
    selectionStart, setSelectionStart,
    setSelectedDocs,
  } = useContextMenuContext();

  const toggleModal: MouseEventHandler<HTMLSpanElement> = (e) => {
    // contextMenuRef
    const xyCoord = getResponsiveMenuPosition(e as any as MouseEvent);
    if (contextMenuRef?.current?.isOpen) {
      contextMenuRef.current.close();
    } else {
      setCoordinates({ top: '-10px', left: (-1 * xyCoord.extra_x || 10) + 'px' });
      contextMenuRef?.current?.open();
    }
  };

  const MORE_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(() => [
    {
      text: 'New Folder',
      icon_url: '/icons/modal-icons/new-folder-icon.svg',
      action: openNewFolderModal,
    },
    {
      text: 'Upload File(s)',
      icon_url: '/icons/modal-icons/upload-icon.svg',
      action: openFileUploadDialog,
    },
    {
      text: `${selectionStart ? 'Stop' : 'Start'} Selection`,
      icon_url: '/icons/modal-icons/select-file-icon.svg',
      action: () => {
        if (selectionStart) { // then we should stop selection
          setSelectionStart(false);
          setSelectedDocs([]);
          return;
        }

        setSelectionStart(true);
      },
    },
  ], [selectionStart]);

  useEffect(() => {
    console.log('selection start', selectionStart);
  }, [selectionStart]);

  return (
    <DivCard position='relative'> {/* This relative positioning is for the ContextMenu */}
      <TextTag cursor='pointer' onClick={toggleModal}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
        More
      </TextTag>

      <ContextMenu top={coordinates.top} left={coordinates.left} ref={contextMenuRef} content={MORE_CONTEXT_MENU_CONTENT} />
    </DivCard>
  );
};
