'use client';

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { IModalWrapperRef } from '..';
import { Button, DivCard, Overlay } from '@/components/atoms';
import { CONTEXT_MENU_ICONS } from '@/core/ui/icons';
import Image from 'next/image';

import type { ForwardedRef, LegacyRef, MouseEventHandler } from 'react';

interface Props {
  children: React.ReactNode;

  use_base_btns_instead?: boolean; // false by default

  confirmAction?: Function, cancelAction?: Function;
  confirmMsg?: string; cancelMsg?: string;

  isLoading?: boolean;
  loadingMsg?: string;

  prevent_auto_focus?: boolean; // to prevent the dialog's auto focus effect
};

function AppModalWrapper(
  {
    children,
    confirmMsg, cancelMsg,
    confirmAction, cancelAction,

    use_base_btns_instead = false,
    isLoading = false,
    loadingMsg = 'Loading...',

    prevent_auto_focus = false,
  }: Props,
  _ref: ForwardedRef<IModalWrapperRef>
) {
  const dialogRef = useRef<HTMLDialogElement>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalClose = () => {
    if (isLoading) return;

    if (cancelAction) {
      cancelAction();
      return;
    }
    dialogRef.current?.close();
  };

  useImperativeHandle(_ref, () => {
    return {
      open() {
        setShowModal(true);
        dialogRef.current?.showModal();
      },
      close() {
        dialogRef.current?.close();
        setShowModal(false);
      },
      isOpen: showModal,
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [showModal]);

  return (
    <>
      <dialog ref={dialogRef as LegacyRef<HTMLDialogElement>} autoFocus={!prevent_auto_focus}>
        <Overlay
          show={showModal}
          onClick={handleModalClose}
          z_index='9'
        />

        <DivCard
          bg='normal' position='fixed' top='50%' left='50%' transform='translate(-50%, -50%)' z_index='10' flex_dir='column' align='start' justify='space-between'
          padding='1rem' radius='8px'
          min_width='min(97vw, 400px)'
          min_height='180px'
        >
          {!use_base_btns_instead && (
            <Image
              src={CONTEXT_MENU_ICONS.close}
              alt='Show more'
              className='cursor-pointer'
              height={24}
              width={24}
              onClick={handleModalClose}
            />
          )}

          <DivCard width='100%' flex_dir='column' align='start' justify='start' margin='1rem 0 0' gap='10px'>
            {children}
          </DivCard>

          {use_base_btns_instead && (
            <DivCard width='100%' justify='end' gap='1rem' margin='1rem 0 0'>
              <Button bg='error' radius='5px' onClick={cancelAction as MouseEventHandler<HTMLButtonElement>}
                disabled={isLoading} cursor={isLoading ? 'not-allowed' : 'pointer'}
              >
                {cancelMsg || 'Cancel'}
              </Button>

              <Button bg='blued' radius='5px' onClick={confirmAction as MouseEventHandler<HTMLButtonElement>}
                disabled={isLoading} cursor={isLoading ? 'not-allowed' : 'pointer'}
              >
                {
                  isLoading ? loadingMsg : confirmMsg || 'Confirm'
                }
              </Button>
            </DivCard>
          )}
        </DivCard>
      </dialog>
    </>
  );
};

export default forwardRef(AppModalWrapper);
