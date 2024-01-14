'use client';

import {
  StyledDisplayCard,
  ISharedCardProps // type
} from '../shared';
import Image from 'next/image';
import { TextTag } from '@/_core/ui/components/atoms';
import { useMemo } from 'react';
import { shortenText } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';

interface Props extends ISharedCardProps {
  //
};

export default function FolderCard({ doc: folder }: Props) {
  const folderLength = useMemo(() => Number(folder?.capacity?.length), [folder?.capacity?.length]);

  return (
    <StyledDisplayCard>
      <Image
        src='/icons/folder-icon.svg'
        alt='file icon'
        width={100}
        height={100}
      />

      <div className='bottom'>
        <div className='doc_name'>
          <TextTag title={folder.name} weight='500' margin='0'>
            {shortenText(folder.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </div>

        <div className='footer'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {folderLength > 0 ?
              (folderLength + ` file${folderLength > 1 ? 's' : ''}`) :
              'Empty'
            }
          </TextTag>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {folderLength > 0 ? folder.capacity.size : null}
          </TextTag>
        </div>
      </div>
    </StyledDisplayCard>
  );
};
