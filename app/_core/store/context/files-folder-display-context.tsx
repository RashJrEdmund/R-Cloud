'use client';

import { createContext, useContext, useState, useMemo, useRef, useEffect } from 'react';
import { ContextMenu, UploadModal } from '@/components/modals';
import { uploadFile } from '@/core/config/firebase';
import { useUserStore } from '../zustand';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';

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
  const [progress, setProgress] = useState<{ [key: number]: number } | null>(null);
  const [currentUploadIndx, setCurrentUploadIndx] = useState<number>(0);
  const { currentUser } = useUserStore();

  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const modalRef = useRef<IModalWrapperRef>();

  const closeModal = () => {
    modalRef.current?.close();
    setSelectedFiles([]);
    setUploadDetails(null);
    setProgress(null);
  };

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

  const uploadFiles = async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setCurrentUploadIndx(i);
        const res = await uploadFile(file, currentUser.email, (progress) => setProgress({ [i]: progress }));

        console.log(res);
      }

    } catch (error) {

    } finally {
      setIsLoading(false);
      closeModal();
    };
  };

  useEffect(() => {
    if (progress) console.log('progress changing', progress);
  }, [progress]);

  const contextValue = useMemo<IFilesFolderDisplayContext>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,
    readyUploadModal,
  }), []);

  return (
    <FilesFolderDisplayContext.Provider value={contextValue}>
      <>
        <UploadModal
          modalRef={modalRef}
          isLoading={isLoading}
          closeModal={closeModal}
          uploadFiles={uploadFiles}
          selectedFiles={selectedFiles}
          uploadDetails={uploadDetails}
          progress={progress}
          currentUploadIndx={currentUploadIndx}
        />

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
