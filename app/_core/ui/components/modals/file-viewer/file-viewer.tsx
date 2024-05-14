import type { MutableRefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';
import AppModalWrapper from '../generics/app-modal-wrapper';

interface Props {
  documents: IDocument[];
  fileViewerRef: MutableRefObject<IModalWrapperRef | undefined>;
}

export default function FileViewer({ fileViewerRef, documents = [] }: Props) {
  const files = documents.filter((doc) => doc.type !== 'FOLDER');

  return (
    <AppModalWrapper
      ref={fileViewerRef as MutableRefObject<IModalWrapperRef>}
      use_base_btns_instead
      prevent_auto_focus
    >
      {/* <object
        width={500}
        height={500}
        data='https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'
      /> */}

      <embed
        width='100%'
        height='100%'
        style={{ height: '80vh' }}
        src='https://firebasestorage.googleapis.com/v0/b/r-cloud-b40e6.appspot.com/o/users%2Forashusedmund%40gmail.com%2Fr-drive%2Frash.resume.pdf-1715668717872.pdf?alt=media&token=c08575db-1da8-4759-baf3-f4cc75cacc8b'
      />
    </AppModalWrapper>
  );
};
