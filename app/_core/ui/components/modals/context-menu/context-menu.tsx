import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { RelativeModal } from '../generics';
import type { IModalWrapperRef } from '../generics';
import { TextTag } from '@/components/atoms';
import Image from 'next/image';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props {
  content: ContextMenuContent[];
  top: string;
  left: string;

  children?: React.ReactNode | null;
};

function ContextMenu(
  {
    content,
    top = '50%',
    left = '50%',

    children = null,
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
      position='absolute' // no parent has position relative
      top={top}
      left={left}
    >
      {children}

      {content.map(({ text, icon_url, action }) => (
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
