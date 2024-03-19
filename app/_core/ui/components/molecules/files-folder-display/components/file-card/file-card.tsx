'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { SelectCheckbox, StyledDisplayCard } from '../shared';
import { DivCard, TextTag } from '@/components/atoms';
import { getResponsiveMenuPosition, openFileUploadDialog, shortenText } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';
import { useContextMenuContext } from '@/store/context';
import { useAppStore } from '@/store/zustand';
import Image from 'next/image';

import type { MouseEventHandler, MutableRefObject } from 'react';
import type { ISharedCardProps } from '../shared';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props extends ISharedCardProps {
  // PROPS
};

interface ICardComponentProps extends Props { // doc: IDocument already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  imagePreview: { img: string, isCustom?: boolean }; // This helps to know weather or not to add the object-fit: cover; css style.
  fileRef: MutableRefObject<HTMLDivElement | undefined>;
};

function _GridFileCard({ doc: file, imagePreview, fileRef, handleOpen }: ICardComponentProps) {
  const [backupImage, setBackupImage] = useState<string | null>('');

  return (
    <StyledDisplayCard ref={fileRef as any} onDoubleClick={handleOpen}>
      <SelectCheckbox document={file} />

      <Image
        src={backupImage || imagePreview.img}
        className={imagePreview?.isCustom ? 'custom_img' : ''}
        onError={() => {
          if (imagePreview.isCustom) setBackupImage('/icons/image-file-icon.svg');
        }}
        alt='file icon'
        width={60}
        height={60}
      />

      <DivCard flex_dir='column' align='start'>
        <DivCard margin='5px 0 0'>
          <TextTag title={file.name} weight='500' size='0.9rem' margin='0' no_white_space>
            {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </DivCard>

        <DivCard width='100%' margin='10px 0 0' gap='5px'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.extension}
          </TextTag>

          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.capacity.size}
          </TextTag>
        </DivCard>
      </DivCard>
    </StyledDisplayCard>
  );
};

function _ListFileCard({ doc: file, imagePreview, fileRef, handleOpen }: ICardComponentProps) {

  return (
    <DivCard width='100%' flex_wrap='nowrap' justify='start' padding='12px 10px' cursor='pointer' className='card' position='relative'
      ref={fileRef as any} onDoubleClick={handleOpen}
    >
      <SelectCheckbox document={file} />

      <Image
        src={imagePreview.img}
        alt='file icon'
        width={25}
        height={25}
      />

      <DivCard margin='0 0 0 10px'>
        <TextTag title={file.name} weight='500' size='0.9rem' margin='0' no_white_space>
          {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH + 14)}
        </TextTag>

        <DivCard justify='start' width='100%' gap='5px'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.extension}
          </TextTag>

          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.capacity.size}
          </TextTag>
        </DivCard>
      </DivCard>
    </DivCard>
  );
};

// HOC STARTS HERES

function FileCardHoc(CardComponent: (props: ICardComponentProps) => JSX.Element) {
  /* FUNC_DESC +=> ===================================================================
  | Could not bring myself to copying the same logic and using in both variations of |
  | the FileCard components so i built this high order component to handle all the   |
  | necessary computation, and then pass down props to each variation                |
  ================================================================//================*/
  return function Card({ doc: file }: Props) {
    const fileRef = useRef<HTMLDivElement>();

    const { displayLayout } = useAppStore();

    const {
      setContextCoordinates,
      setContextContent,
      contextMenuRef,

      selectedDocs,
      handleDocumentSelection,
    } = useContextMenuContext();

    // console.log({ selectedDocs });

    // console.log('is file include?', selectedDocs.includes(file.id));

    const FILE_CONTEXT_MENU_CONTENT = useMemo<ContextMenuContent[]>(() => [
      {
        text: 'Open File',
        icon_url: '/icons/modal-icons/open-folder-icon.svg',
        action: () => null,
      },
      {
        text: 'Rename File',
        icon_url: '/icons/modal-icons/rename-icon.svg',
        action: () => null,
      },
      {
        text: 'New File',
        icon_url: '/icons/modal-icons/upload-icon.svg',
        action: openFileUploadDialog,
      },
      {
        text: `${selectedDocs.includes(file.id) ? 'Deselect' : 'Select'} File`,
        icon_url: '/icons/modal-icons/select-file-icon.svg',
        action: () => handleDocumentSelection(file),
      },
      {
        text: 'Copy File',
        icon_url: '/icons/modal-icons/rename-icon.svg',
        action: () => null,
      },
      {
        text: 'Delete File',
        icon_url: '/icons/modal-icons/delete-icon.svg',
        action: () => null,
      }
    ], [selectedDocs]);

    const imagePreview = useMemo<{ img: string, isCustom?: boolean }>(() => {
      if (displayLayout === 'LIST') {
        if (file.content_type?.includes('image')) {
          return { img: '/icons/image-file-icon.svg' };
        }
      }

      if (file.content_type?.includes('image') && file.download_url) {
        return { img: file.download_url, isCustom: true }; // adding object-fit: cover; to custom image;
      }

      // The below apply for both LIST and GRID views;

      if (file.content_type?.includes('video')) {
        return { img: '/icons/image-video-icon.svg' };
      }

      return { img: '/icons/text-file-icon.svg' };
    }, [file.type, displayLayout]);

    const handleOpen: MouseEventHandler<HTMLDivElement> = () => {
      // router.push('/r-drive?file=' + folder.id);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const coordinates = getResponsiveMenuPosition(e);
      setContextCoordinates({ top: coordinates.y + 'px', left: coordinates.x + 'px' });

      setContextContent(FILE_CONTEXT_MENU_CONTENT);

      contextMenuRef.current?.open();
    };

    useEffect(() => {
      if (!fileRef.current) return;

      fileRef.current.addEventListener('contextmenu', handleContextMenu, false);

      return () => {
        fileRef.current?.removeEventListener('contextmenu', handleContextMenu, false);
      };
    }, []);

    return (
      <CardComponent
        doc={file}
        handleOpen={handleOpen}
        fileRef={fileRef}
        imagePreview={imagePreview}
      />
    );
  };
}

const GridFileCard = FileCardHoc(_GridFileCard);

const ListFileCard = FileCardHoc(_ListFileCard);

export {
  GridFileCard,
  ListFileCard,
};
