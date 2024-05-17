import type { IDocument } from '@/interfaces/entities';
import { StyledEmbedTag } from './styles';
import Image from 'next/image';

export default function Viewer({ fileInView }: { fileInView: IDocument }) {
  if (fileInView?.content_type?.includes('video')) {
    return (
      <video
        controls
        width='100%'
      >
        <source src={fileInView.download_url || ''} />
        your browser does not support videos
      </video>
    );
  }

  if (fileInView?.content_type?.includes('audio')) {
    return (
      <audio
        controls
        className='w-full'
      >
        <source src={fileInView.download_url || ''} type={fileInView.content_type} />
        Your browser does not support the audio tag.
      </audio>
    );
  }

  if (fileInView?.content_type?.includes('image')) {
    return (
      <img
        width='100'
        height='100'
        // quality={100}
        alt={'image for ' + fileInView?.name}
        src={fileInView?.download_url || ''}
        // objectFit='contain'
        // placeholder='blur'
        style={{ maxHeight: '90vh', minWidth: 'min(90vw, 1000px)', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}
      />
    );
  }

  return (
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
            data={fileInView?.download_url || ''}
          /> */}
    </>
  );
};
