import {
  StyledDisplayCard,
  ISharedCardProps // type
} from '../shared';
import Image from 'next/image';
import { DivCard, TextTag } from '@/components/atoms';
import { useMemo } from 'react';
import { getSize, shortenText } from '@/utils/helpers';
import { FILE_FOLDER_MAX_NAME_LENGTH } from '@/utils/constants';

interface Props extends ISharedCardProps {
  //
};

export default function FileCard({ doc: file }: Props) {
  const imagePreview = useMemo<string>(() => (file.content_type.includes('image') && file.download_url )? file.download_url : '/icons/text-file-icon.svg', [file.type]);

  return (
    <StyledDisplayCard>
      <Image
        src={imagePreview}
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

        <DivCard  width='100%' margin='10px 0 0' gap='5px'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.extension}
          </TextTag>

          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {getSize(file.capacity.size)}
          </TextTag>
        </DivCard>
      </DivCard>
    </StyledDisplayCard>
  );
};
