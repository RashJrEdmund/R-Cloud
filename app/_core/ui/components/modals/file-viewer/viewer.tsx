'use client';

import type { IDocument } from '@/interfaces/entities';
import styled from '@emotion/styled';
import Image from 'next/image';

const StyledEmbedTag = styled.embed`
  min-height: 80vh;
  min-width: min(94vw, 1000px);
  /* max-height: 93vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  * {
    background-color: red;
    padding: 5px;
    border: 3px solid red;
    object-fit: fill;
  }

  * {
    margin: 0 auto;
  }
`;

export default function Viewer({ fileInView }: { fileInView: IDocument }) {
  return (
    fileInView?.content_type?.includes('iimage') ?
      (
        <Image
          width='100'
          height='100'
          quality={100}
          alt={'image for ' + fileInView?.name}
          src={fileInView?.download_url || ''}
          objectFit='contain'
          // placeholder='blur'
          style={{ minHeight: '80vh', minWidth: 'min(90vw, 1000px)', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}
        />
      ) : (
        <>
          <StyledEmbedTag
            width='100%'
            height='100%'
            // type={fileInView?.content_type || undefined} // this is for when using <object /> tag
            src={fileInView?.download_url || ''}
          />

          {/* <object
          width='100%'
          height='100%'
          style={{ minHeight: '80vh', width: 'min(95vw, 1000px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          data={currenFile?.download_url || ''}
        /> */}
        </>
      )
  );
};
