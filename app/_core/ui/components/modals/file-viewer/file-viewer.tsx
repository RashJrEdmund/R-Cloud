import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';
import AppModalWrapper from '../generics/app-modal-wrapper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDocStore } from '@/store/zustand';
import { DivCard } from '@/components/atoms';
import Image from 'next/image';
import Viewer from './viewer';

export default function FileViewer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currenFile, setCurrentFile] = useState<IDocument>({} as IDocument);
  const [currentIndx, setCurrentIndx] = useState<number>(0);

  const fileViewerRef = useRef<IModalWrapperRef>();

  const { documents } = useDocStore();

  const handleCancelAction = () => {
    setCurrentFile({} as IDocument);
    router.replace(pathname);
    // fileViewerRef.current?.close();
  };

  const files = useMemo(() => {
    const _files = (documents || []).filter((doc) => doc.type !== 'FOLDER');

    return _files.length ? _files : null;
  }, [documents]);

  const handMotion = (direction: 'NEXT' | 'PREV') => {
    if (!files) return;

    let newIndx = currentIndx;

    switch (direction) {
    case 'NEXT':
      newIndx++;
      break;
    case 'PREV':
      newIndx--;
      break;
    default:
      break;
    }

    if (!files[newIndx]) return;

    router.replace(`${pathname}?viewing=${files[newIndx].id}`);
  };

  const getCurrentIdex = useCallback((fileId: string) => {
    if (!files) return 0;

    for (const i in files) {
      const file = files[i];

      if (file.id === fileId) return +i;
    }

    return 0;
  }, [files]);

  useEffect(() => {
    // searchParams.set()
    const fileId = searchParams.get('viewing'); // this params is set whenever a file is opened, and it's value set to the file's Id.

    if (!files || !fileId?.trim()) {
      if (fileViewerRef.current?.isOpen) fileViewerRef.current?.close();
      return;
    };

    const curIndx = getCurrentIdex(fileId);

    setCurrentIndx(curIndx);

    setCurrentFile(files[curIndx]);

    if (!fileViewerRef.current?.isOpen) { // if it's closed, we open it here
      fileViewerRef.current?.open();
    }

  }, [searchParams, files, getCurrentIdex]);

  // searchParams.set()

  // console.log({ currenFile });

  return (
    <AppModalWrapper
      ref={fileViewerRef as MutableRefObject<IModalWrapperRef>}
      use_base_btns_instead={false}
      prevent_auto_focus
      cancelAction={handleCancelAction}
    >
      <DivCard width='100%' position='relative' padding='0 10px'>
        {/* <DivCard position='absolute' top='50%' left='0' transform='translate(0, -50%)'
          onClick={() => handMotion('PREV')}
        >
          &lt; prev
        </DivCard> */}

        <Viewer fileInView={currenFile} />

        {/* <DivCard position='absolute' top='50%' right='0' transform='translate(0, -50%)'
          onClick={() => handMotion('PREV')}
        >
          &gt; next
        </DivCard> */}
      </DivCard>
    </AppModalWrapper>
  );
};
