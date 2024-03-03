'use client';

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { IModalWrapperRef } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, DivCard, Overlay, TextTag } from '@/components/atoms';

import type { ForwardedRef, LegacyRef, MouseEventHandler } from 'react';

interface Props {
  children: React.ReactNode;

  use_base_btns_instead?: boolean;

  confirmAction?: Function, cancelAction?: Function;
  confirmMsg?: string; cancelMsg?: string;

  isLoading?: boolean;
  loadingMsg?: string;
};

function AppModalWrapper(
  {
    children,
    confirmMsg, cancelMsg,
    confirmAction, cancelAction,

    use_base_btns_instead = false,
    isLoading = false,
    loadingMsg = 'Loading...'
  }: Props,
  _ref: ForwardedRef<IModalWrapperRef>
) {
  const dialogRef = useRef<HTMLDivElement>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useImperativeHandle(_ref, () => {
    return {
      open() {
        setShowModal(true);
        console.log('opening dialog');
      },
      close() {
        setShowModal(false);
      },
      isOpen: showModal,
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [showModal]);

  return showModal ? (
    <>
      <Overlay
        show={showModal}
        onClick={() => {
          if (cancelAction) {
            cancelAction();
            return;
          }
          setShowModal(false);
        }}
        z_index='4'
      />

      <DivCard ref={dialogRef as LegacyRef<HTMLDivElement>}
        bg='normal' position='fixed' top='50%' left='50%' transform='translate(-50%, -50%)' z_index='6' flex_dir='column' align='start' justify='space-between'
        padding='1rem' radius='8px'
        min_width='min(97vw, 400px)'
        min_height='170px'
      >
        {!use_base_btns_instead && (
          <TextTag size='1.25rem' cursor='pointer' onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </TextTag>
        )}

        <DivCard width='100%' flex_dir='column' align='start' justify='start' margin='0.5rem 0 0' gap='10px'>
          {children}
        </DivCard>

        {use_base_btns_instead && (
          <DivCard width='100%' justify='end' gap='1rem' margin='0.5rem 0 0'>
            <Button bg='error' radius='5px' disabled={isLoading} onClick={cancelAction as MouseEventHandler<HTMLButtonElement>}>
              {cancelMsg || 'Cancel'}
            </Button>

            <Button bg='blued' radius='5px' disabled={isLoading} onClick={confirmAction as MouseEventHandler<HTMLButtonElement>}>
              {
                isLoading ? loadingMsg : confirmMsg || 'Confirm'
              }
            </Button>
          </DivCard>
        )}
      </DivCard>
    </>
  ) : null;
}

export default forwardRef(AppModalWrapper);

// TODO +=> BUILD APP MODAL WITH DIALOG TAG.
