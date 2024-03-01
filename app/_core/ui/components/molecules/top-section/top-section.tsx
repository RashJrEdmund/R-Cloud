'use client';

import { DivCard, TextTag } from '@/components/atoms';
import TopSectionHolder from './top-section-holder';
import { Navigator, Search, DisplayLayout } from './_components';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenu } from '@/components/modals';
import { useRef } from 'react';
import { IModalWrapperRef } from '@/components/modals/generics';
import { ContextMenuContent } from '@/interfaces/app';

interface Props {
  hide_search?: boolean;
};

const MORE_CONTEXT_MENU_CONTENT: ContextMenuContent[] = [
  {
    text: 'New Folder',
    icon_url: '/icons/modal-icons/new-folder-icon.svg',
    action: () => null,
  },
  // {
  //   text: 'Open Folder',
  //   icon_url: '/icons/modal-icons/open-folder-icon.svg',
  //   action: () => null,
  // },
  {
    text: 'Upload File',
    icon_url: '/icons/modal-icons/upload-icon.svg',
    action: () => null,
  },
  // {
  //   text: 'Rename Folder',
  //   icon_url: '/icons/modal-icons/rename-icon.svg',
  //   action: () => null,
  // },
  // {
  //   text: 'Delete Folder',
  //   icon_url: '/icons/modal-icons/delete-icon.svg',
  //   action: () => null,
  // }
];

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

              <ContextMenu top='-10px' left='-10px' ref={contextMenuRef} content={MORE_CONTEXT_MENU_CONTENT} />
            </DivCard>
          </DivCard>
        )
      }
    </TopSectionHolder>
  );
};
