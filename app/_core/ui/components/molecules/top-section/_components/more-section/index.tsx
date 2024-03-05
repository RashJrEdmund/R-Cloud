'use client';

import { useRef, useMemo } from 'react';
import { DivCard, TextTag } from '@/components/atoms';
import { ContextMenu } from '@/components/modals';
import { openFileUploadDialog } from '@/utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props {
  //
};

export default function MoreSection({ }: Props) {
  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const toggleModal = () => {
    // contextMenuRef
    if (contextMenuRef?.current?.isOpen) {
      contextMenuRef.current.close();
    } else {
      contextMenuRef?.current?.open();
    }
  };

  const MORE_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(() => [
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
  ], []);

  return (
    <DivCard position='relative'> {/* This relative positioning is for the ContextMenu */}
      <TextTag cursor='pointer' onClick={toggleModal}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
        More
      </TextTag>

      <ContextMenu top='-10px' left='-10px' ref={contextMenuRef} content={MORE_CONTEXT_MENU_CONTENT} />
    </DivCard>
  );
};
