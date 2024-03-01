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

function GridFileCard({ doc: file }: Props) {
  const imagePreview = useMemo<string>(() => {
    if (file.content_type.includes('image') && file.download_url) {
      return file.download_url;
    }

    return '/icons/text-file-icon.svg';
  }, [file.type]);

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

        <DivCard width='100%' margin='10px 0 0' gap='5px'>
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

function ListFileCard({ doc: file }: Props) {
  const imagePreview = useMemo<string>(() => {
    return '/icons/text-file-icon.svg';
  }, []);

  return (
    <DivCard width='100%' flex_wrap='nowrap' justify='start' padding='8px' className='card'>
      <Image
        src={imagePreview}
        alt='file icon'
        width={22}
        height={22}
      />

      <DivCard margin='0 0 0 10px'>
        <TextTag title={file.name} weight='500' size='0.9rem' margin='0' no_white_space>
          {shortenText(file.name, FILE_FOLDER_MAX_NAME_LENGTH)}
        </TextTag>

        <DivCard justify='start' width='100%' gap='5px'>
          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {file.extension}
          </TextTag>

          <TextTag color_type='grayed' size='0.75rem' no_white_space>
            {getSize(file.capacity.size)}
          </TextTag>
        </DivCard>
      </DivCard>
    </DivCard>
  );
};

export {
  GridFileCard,
  ListFileCard,
};
