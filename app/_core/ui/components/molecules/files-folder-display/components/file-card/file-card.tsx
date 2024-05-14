'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { SelectCheckbox, StyledDisplayCard } from '../shared';
import { DivCard, TextTag } from '@/components/atoms';
import { deriveDocumentPreviewImage, openFileUploadDialog, shortenText } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';
import { useContextMenuContext, useModalContext } from '@/store/context';
import { useAppStore } from '@/store/zustand';
import { CONTEXT_MENU_ICONS, MEDIA_ICONS } from '@/core/ui/icons';
import Image from 'next/image';

import type { MouseEventHandler, MutableRefObject } from 'react';
import type { ISharedCardProps } from '../shared';
import type { ContextMenuContent } from '@/interfaces/app';
import { usePathname, useRouter } from 'next/navigation';

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
          if (imagePreview.isCustom) setBackupImage(MEDIA_ICONS.img);
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
    const pathname = usePathname();
    const router = useRouter();

    const { displayLayout } = useAppStore();

    const {
      handleDocCardContextMenu,

      selectionStart,
    } = useContextMenuContext();

    const { openEditDocumentModal, openDeleteDocumentModal } = useModalContext();

    // console.log({ selectedDocs });

    // console.log('is file include?', selectedDocs.includes(file.id));

    const handleOpen: MouseEventHandler<HTMLDivElement> = () => {
      router.push(`${pathname}?viewing=${file.id}`);
    };

    const FILE_CONTEXT_MENU_CONTENT = useMemo<ContextMenuContent[]>(() => [
      {
        text: 'Open File',
        icon_url: CONTEXT_MENU_ICONS.open,
        action: handleOpen,
      },
      {
        text: 'Rename File',
        icon_url: CONTEXT_MENU_ICONS.rename,
        action: () => openEditDocumentModal(file),
      },
      {
        text: 'New File',
        icon_url: CONTEXT_MENU_ICONS.upload,
        action: openFileUploadDialog,
      },
      {
        text: 'Copy File',
        icon_url: CONTEXT_MENU_ICONS.copy,
        action: () => null,
      },
      {
        text: 'Delete File',
        icon_url: CONTEXT_MENU_ICONS.delete,
        action: () => openDeleteDocumentModal(file),
      }
    ], []);

    const imagePreview = useMemo<{ img: string, isCustom?: boolean }>(() => {
      return deriveDocumentPreviewImage(file, displayLayout);
    }, [displayLayout, file.content_type]);

    const handleContext = (e: MouseEvent) => {
      handleDocCardContextMenu({
        event: e,
        CONTEXT_MENU_CONTENT: FILE_CONTEXT_MENU_CONTENT
      });
    };

    useEffect(() => {
      if (!fileRef.current) return;

      fileRef.current.addEventListener('contextmenu', handleContext, false);

      return () => {
        fileRef.current?.removeEventListener('contextmenu', handleContext, false);
      };
    }, [selectionStart]);

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
