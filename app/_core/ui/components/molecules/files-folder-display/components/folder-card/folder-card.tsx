'use client';

import {
  StyledDisplayCard,
  ISharedCardProps // type
} from '../shared';
import Image from 'next/image';
import { DivCard, TextTag } from '@/_core/ui/components/atoms';
import { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { shortenText, getSize } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';

interface Props extends ISharedCardProps {
  //
};

export default function FolderCard({ doc: folder }: Props) {
  const router = useRouter();
  const folderLength = useMemo(() => Number(folder?.capacity?.length), [folder?.capacity?.length]);
  const pathname = usePathname();

  const handleOpen = () => {
    // console.log(pathname);
    router.push('/home/' + folder.id);
  };

  return (
    <StyledDisplayCard
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
