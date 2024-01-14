import {
  StyledDisplayCard,
  ISharedCardProps // type
} from '../shared';
import Image from 'next/image';
import { TextTag } from '@/components/atoms';
import { useMemo } from 'react';
import { shortenText } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';

interface Props extends ISharedCardProps {
  //
};

export default function FileCard({ doc: file }: Props) {
  const imagePreview = useMemo<string>(() => !(file.contentType.includes('image') && file.downloadUrl )? file.downloadUrl : '/icons/text-file-icon.svg', [file.type]);

  return (
    <StyledDisplayCard>
      <Image
        src={imagePreview}
        alt='file icon'
        width={60}
        height={60}
      />

      <div className='bottom'>
        <div className='doc_name'>
          <TextTag title={file.name} weight='500' margin='0' no_white_space>
            {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH)}
          </TextTag>
        </div>

        <div className='footer'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.capacity.size}
          </TextTag>
        </div>
      </div>
    </StyledDisplayCard>
  );
};
