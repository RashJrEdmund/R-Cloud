import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { RelativeModal } from '../generics';
import type { IModalWrapperRef } from '../generics';
import { TextTag } from '@/components/atoms';
import Image from 'next/image';

const CONTEXT_MENU_CONTENT: { text: string; icon_url: string; action: Function; }[] = [
  {
    text: 'New Folder',
    icon_url: '/icons/modal-icons/new-folder-icon.svg',
    action: () => null,
  },
  {
    text: 'Open Folder',
    icon_url: '/icons/modal-icons/open-folder-icon.svg',
    action: () => null,
  },
  {
    text: 'Upload File',
    icon_url: '/icons/modal-icons/upload-icon.svg',
    action: () => null,
  },
  {
    text: 'Rename Folder',
    icon_url: '/icons/modal-icons/rename-icon.svg',
    action: () => null,
  },
  {
    text: 'Delete Folder',
    icon_url: '/icons/modal-icons/delete-icon.svg',
    action: () => null,
  }
];

interface Props {
  top: string;
  left: string;
};

function ContextMenu(
  {
    top = '50%',
    left = '50%',
  }: Props,
  _ref: ForwardedRef<IModalWrapperRef>
) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useImperativeHandle(_ref, () => {
    return {
      open() {
        setShowModal(true);
      },
      close() {
        setShowModal(false);
      },
      isOpen: showModal
    };
  }, [showModal]);

  return (
    <RelativeModal
      showModal={showModal}
      setShowModal={setShowModal}
      position='absolute'
      top={top}
      left={left}
    >
      {CONTEXT_MENU_CONTENT.map(({ text, icon_url, action }) => (
        <TextTag key={text} no_white_space cursor='pointer' onClick={() => action()}>
          <Image
            src={icon_url}
            alt='close modal icon'
            className='cursor-pointer'
            height={17}
            width={17}
          />
          {text}
        </TextTag>
      ))}
    </RelativeModal>
  );
};

export default forwardRef(ContextMenu);
