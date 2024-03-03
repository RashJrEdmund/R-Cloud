'use client';

import { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import { AppModalWrapper, type IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';

import { ContextMenu } from '@/components/modals';
import { Button, DivCard, TextTag } from '@/components/atoms';
import { getSizeFromBytes } from '@/utils/file-utils';

interface IContextCoordinates {
  top: string;
  left: string;
}

interface IUploadDetails {
  total_size: number;
  count: number
}

interface IFilesFolderDisplayContext {
  setContextCoordinates: Dispatch<SetStateAction<IContextCoordinates>>;

  setContextContent: Dispatch<SetStateAction<ContextMenuContent[]>>;

  contextMenuRef: RefObject<IModalWrapperRef>;

  readyUploadModal: (files: FileList, items?: DataTransferItemList) => void;
};

const FilesFolderDisplayContext = createContext<IFilesFolderDisplayContext | null>(null);

const FilesFolderDisplayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextCoordinates, setContextCoordinates] = useState<IContextCoordinates>({ top: '0', left: '0' });
  const [contextContent, setContextContent] = useState<ContextMenuContent[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadDetails, setUploadDetails] = useState<IUploadDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const modalRef = useRef<IModalWrapperRef>();

  const readyUploadModal = (files: FileList, items?: DataTransferItemList) => {
    const file_arr = [];
    let total_size = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file_arr.push(file);
      total_size += file.size;
    };

    setSelectedFiles(file_arr);
    setUploadDetails({ total_size, count: file_arr.length });

    modalRef.current?.open();

    console.log(files, items);
  };

  const uploadFiles = () => {
    // firebase stuff.
  };

  const closeModal = () => {
    modalRef.current?.close();
    setSelectedFiles([]);
    setUploadDetails(null);
  };

  const contextValue = useMemo<IFilesFolderDisplayContext>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,
    readyUploadModal,
  }), []);

  return (
    <FilesFolderDisplayContext.Provider value={contextValue}>
      <>
        <AppModalWrapper ref={modalRef as any}
          use_base_btns_instead
          isLoading={isLoading}
          cancelAction={closeModal}
          confirmAction={uploadFiles}
        >
          <TextTag>
            You&apos;ve selected
            <TextTag color_type='success'>
              {selectedFiles.length} file{selectedFiles.length > 0 ? 's' : ''}
            </TextTag>
          </TextTag>

          <TextTag>
            Total upload size <TextTag color_type='success'>{getSizeFromBytes(uploadDetails?.total_size ?? 0)}</TextTag>
          </TextTag>
        </AppModalWrapper>

        <ContextMenu
          ref={contextMenuRef}
          content={contextContent}
          top={contextCoordinates.top}
          left={contextCoordinates.left}
        />

        {children}
      </>
    </FilesFolderDisplayContext.Provider>
  );
};

const useFilesFolderDisplayContext = (): IFilesFolderDisplayContext => useContext(FilesFolderDisplayContext) as IFilesFolderDisplayContext;

export {
  FilesFolderDisplayContextProvider,
  useFilesFolderDisplayContext,
};
