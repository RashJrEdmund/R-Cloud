/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */
'use client';

import { useEffect, useRef } from 'react';
import { DivCard, TextTag } from '@/components/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  radius?: string;

  left?: string; // gives absolute x units towards x-direction;
  top?: string; // gives absolute y units towards y-direction;
  z_index?: string;
  position: 'absolute' | 'fixed';

  sx?: string; // for overriding styles;
};

export default function RelativeModal({ // generic modal
  children,
  showModal,
  setShowModal,

  sx,

  radius = '5px',

  left = '0',
  top = '0',
  z_index = '7',
  position = 'absolute',
}: Props) {

  const modalRef = useRef<any>(null);

  useEffect(() => {
    showModal && modalRef?.current?.focus();
  }, [showModal]);

  return showModal ? (
    <DivCard
      bg='grayed'
      shadow_effect
      position={position}
      top={top}
      left={left}
      z_index={z_index}
      align='start'
      justify='start'
      flex_dir='column'
      padding='1rem'
      gap='10px'
      radius={radius}
      min_width='min(97vw, 200px)'
      min_height='170px'
      sx={sx}
      tabIndex={1}
      ref={modalRef}
      id='relative-modal' // used by the getResponsivePosition function to get component's height and width
      onBlur={() => setShowModal(false)}
    >
      <TextTag size='1.25rem' cursor='pointer' margin='0 0 0.5rem' onClick={() => setShowModal(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </TextTag>

      {children}
    </DivCard>
  ) : null;
};
