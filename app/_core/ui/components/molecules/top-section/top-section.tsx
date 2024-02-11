'use client';

import { DivCard, TextTag } from '@/components/atoms';
import Navigator from './_components/navigator';
import Search from './_components/search';
import TopSectionHolder from './top-section-holder';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenu } from '@/components/modals';
import { useRef } from 'react';
import { IModalWrapperRef } from '@/components/modals/generics';

interface Props {
  //
};

export default function TopSection({ }: Props) {
  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const toggleModal = () => {
    // contextMenuRef
    if (contextMenuRef?.current?.isOpen) {
      contextMenuRef.current.close();
    } else {
      contextMenuRef?.current?.open();
    }
  };

  return (
    <TopSectionHolder>
      <Navigator />

      <DivCard gap='1rem'>
        <Search />
        {/* TODO +=> BUILD MORE MODAL DROP DOWN AND ACTUAL MODAL */}

        <DivCard position='relative'>
          <TextTag cursor='pointer' onClick={toggleModal}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
            More
          </TextTag>

          <ContextMenu top='-30px' left='-30px' ref={contextMenuRef} />
        </DivCard>
      </DivCard>
    </TopSectionHolder>
  );
};
