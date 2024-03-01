'use client';

import { StyledDisplayCard } from '../shared';
import type { ISharedCardProps } from '../shared';
import Image from 'next/image';
import { DivCard, TextTag } from '@/_core/ui/components/atoms';
import { useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { shortenText, getSize } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';
import { useFilesFolderDisplayContext } from '@/store/context';

import type { MutableRefObject, MouseEventHandler } from 'react';
import type { ContextMenuContent } from '@/interfaces/app';

interface Props extends ISharedCardProps {
  //
};

interface ICardComponentProps extends Props { // doc: IDocument already exists as type here.
  handleOpen: MouseEventHandler<HTMLDivElement>;
  folderRef: MutableRefObject<HTMLDivElement | undefined>;
  folderLength: number;
};

const FOLDER_CONTEXT_MENU_CONTENT: ContextMenuContent[] = [
  {
    text: 'Open Folder',
    icon_url: '/icons/modal-icons/open-folder-icon.svg',
    action: () => null,
  },
  // {
  //   text: 'Upload File',
  //   icon_url: '/icons/modal-icons/upload-icon.svg',
  //   action: () => null,
  // },
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

function _GridFolderCard({ doc: folder, folderLength, folderRef, handleOpen }: ICardComponentProps) {
  // const router = useRouter();
  // const folderLength = useMemo(() => Number(folder?.capacity?.length), [folder?.capacity?.length]);

  // const handleOpen = () => {
  //   // console.log(pathname);
  //   router.push('/home?folder=' + folder.id);
  // };

  return (
    <StyledDisplayCard ref={folderRef as any}
      onDoubleClick={handleOpen}
    >
      <Image
        src='/icons/folder-icon.svg'
        alt='file icon'
        width={100}
        height={100}
      />

      <DivCard flex_dir='column' align='start'>
        <DivCard margin='5px 0 0'>
          <TextTag title={folder.name} weight='500' size='0.9rem' margin='0'>
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </DivCard>

        <DivCard justify='start' width='100%' margin='10px 0 0' gap='5px'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {folderLength > 0 ?
              (folderLength + ` file${folderLength > 1 ? 's' : ''}`) :
              'Empty'
            }
          </TextTag>

          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {folderLength > 0 ? getSize(folder.capacity.size) : null}
          </TextTag>
        </DivCard>
      </DivCard>
    </StyledDisplayCard>
  );
};

function _ListFolderCard({ doc: folder, folderLength, folderRef, handleOpen }: ICardComponentProps) {
  // const router = useRouter();
  // const folderLength = useMemo(() => Number(folder?.capacity?.length), [folder?.capacity?.length]);
  // const folderRef = useRef<HTMLDivElement>();

  // const { setContextContent, setContextCoordinates, contextMenuRef } = useFilesFolderDisplayContext();

  // const handleOpen = () => {
  //   router.push('/home?folder=' + folder.id);
  // };

  // const handleContextMenu = (e: MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   setContextContent(FOLDER_CONTEXT_MENU_CONTENT);
  //   setContextCoordinates({ top: e.clientY + 'px', left: e.clientX + 'px' });

  //   contextMenuRef.current?.open();
  // };

  // useEffect(() => {
  //   if (!folderRef.current) return;

  //   folderRef.current.addEventListener('contextmenu', handleContextMenu, false);

  //   return () => {
  //     folderRef.current?.removeEventListener('contextmenu', handleContextMenu, false);
  //   }
  // }, []);

  return (
    <>
      <DivCard ref={folderRef as any} width='100%' flex_wrap='nowrap' justify='start' padding='8px' className='card'
        onDoubleClick={handleOpen}
      >
        <Image
          src='/icons/folder-icon.svg'
          alt='file icon'
          width={32}
          height={30}
        />

        <DivCard margin='0 0 0 10px'>
          <TextTag title={folder.name} weight='500' size='0.9rem' no_white_space>
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH + 14)}
          </TextTag>

          <DivCard justify='start' width='100%' gap='5px'>
            <TextTag color_type='grayed' size='0.75rem' no_white_space>
              {folderLength > 0 ?
                (folderLength + ` file${folderLength > 1 ? 's' : ''}`) :
                'Empty'
              }
            </TextTag>

            <TextTag color_type='grayed' size='0.75rem' no_white_space>
              {folderLength > 0 ? getSize(folder.capacity.size) : null}
            </TextTag>
          </DivCard>
        </DivCard>
      </DivCard>
    </>
  );
};

// HOC STARTS HERES

function FolderCardHoc(CardComponent: (props: ICardComponentProps) => JSX.Element) {
  /* FUNC_DESC +=> =======================================================
  | Could not bring myself to copying the same logic and using in both   |
  | components so i built a high order component to handle all necessary |
  | computation, and then pass down props                                |
  ======================================================//==============*/
  return function Card({ doc: folder }: Props) {
    const router = useRouter();
    const folderLength = useMemo(() => Number(folder?.capacity?.length), [folder?.capacity?.length]);
    const folderRef = useRef<HTMLDivElement>();

    const { setContextContent, setContextCoordinates, contextMenuRef } = useFilesFolderDisplayContext();

    const handleOpen = () => {
      router.push('/home?folder=' + folder.id);
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setContextContent(FOLDER_CONTEXT_MENU_CONTENT);
      setContextCoordinates({ top: e.clientY + 'px', left: e.clientX + 'px' });

      contextMenuRef.current?.open();
    };

    useEffect(() => {
      if (!folderRef.current) return;

      folderRef.current.addEventListener('contextmenu', handleContextMenu, false);

      return () => {
        folderRef.current?.removeEventListener('contextmenu', handleContextMenu, false);
      }
    }, []);

    return (
      <CardComponent
        doc={folder}
        handleOpen={handleOpen}
        folderRef={folderRef}
        folderLength={folderLength}
      />
    );
  };
}

const GridFolderCard = FolderCardHoc(_GridFolderCard);

const ListFolderCard = FolderCardHoc(_ListFolderCard);

export {
  GridFolderCard,
  ListFolderCard,
};
