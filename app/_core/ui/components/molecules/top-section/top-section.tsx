'use client';

import { DivCard, TextTag } from '@/components/atoms';
import TopSectionHolder from './top-section-holder';
import { Navigator, Search, DisplayLayout } from './_components';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenu } from '@/components/modals';
import { useRef } from 'react';
import { IModalWrapperRef } from '@/components/modals/generics';

interface Props {
  hide_search?: boolean;
};

export default function TopSection({
  hide_search = false,
}: Props) {
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

      {hide_search ? null :
        (
          <DivCard gap='1rem'>
            <Search />

            <DisplayLayout />

            <DivCard position='relative'>
              <TextTag cursor='pointer' onClick={toggleModal}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
                More
              </TextTag>

              <ContextMenu top='-30px' left='-30px' ref={contextMenuRef} />
            </DivCard>
          </DivCard>
        )
      }
    </TopSectionHolder>
  );
};
