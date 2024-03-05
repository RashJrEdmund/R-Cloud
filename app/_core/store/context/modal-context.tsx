'use client';

/* FILE_DESC +=> ====================================================================
| This file provides all data and modals needed in the FilesFolderDisplay component |
| in app/_core/ui/components/files-folder-display/files-folder-display.tsx          |
=====================================================================//============*/

import { createContext, useContext, useState, useMemo, useCallback, useRef } from 'react';
import { NewFolderModal, UploadModal } from '@/components/modals';
import { uploadFile } from '@/core/config/firebase';
import { useUserStore } from '../zustand';
import { createFileDoc } from '@/core/config/firebase/fire-store';
import { getFileName, getSizeFromBytes } from '@/utils/file-utils';

import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';
import { useParams } from 'next/navigation';

interface IUploadDetails {
  total_size: number;
  count: number
}

interface IModalContext {
  readyUploadModal: (files: FileList, items?: DataTransferItemList) => void;
  openNewFolderModal: () => void;
};

const ModalContext = createContext<IModalContext | null>(null);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadDetails, setUploadDetails] = useState<IUploadDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ [key: number]: number } | null>(null);
  const [currentUploadIndx, setCurrentUploadIndx] = useState<number>(0);
  const { currentUser } = useUserStore();

  const folderModalRef = useRef<IModalWrapperRef>();
  const uploadModalRef = useRef<IModalWrapperRef>();

  const params = useParams<{ folder_id: string }>();

  const closeUploadModal = () => {
    uploadModalRef.current?.close();
    setSelectedFiles([]);
    setUploadDetails(null);
    setProgress(null);
  };

  const openNewFolderModal = () => {
    folderModalRef.current?.open();
  };

  const readyUploadModal = (files: FileList, items?: DataTransferItemList) => {
    const file_arr = [];
    let total_size = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type) continue;
      file_arr.push(file);
      total_size += file.size;
    };

    setSelectedFiles(file_arr);
    setUploadDetails({ total_size, count: file_arr.length });

    uploadModalRef.current?.open();
  };

  const uploadFiles = useCallback(async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setCurrentUploadIndx(i);
        const url = await uploadFile(file, currentUser.email, (progress) => setProgress({ [i]: progress }));

        const document: Omit<IDocument, 'id'> = {
          download_url: url,
          user_id: currentUser.id,
          name: getFileName(file, { without_extension: true }),
          parent_id: params.folder_id || 'root',
          type: 'FILE',
          content_type: file.type,
          extension: getFileName(file, { only_extension: true }),
          capacity: {
            size: getSizeFromBytes(file.size).merged,
            bytes: file.size,
            length: null,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await createFileDoc(currentUser.email, document as IDocument);
      }

    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      closeUploadModal();
    };
  }, [currentUser, params.folder_id, selectedFiles]);

  // useEffect(() => {
  //   if (progress) console.log('progress changing', progress);
  // }, [progress]);

  const contextValue = useMemo<IModalContext>(() => ({
    readyUploadModal,
    openNewFolderModal,
  }), []);

  return (
    <ModalContext.Provider value={contextValue}>
      <>
        <UploadModal
          uploadModalRef={uploadModalRef}
          isLoading={isLoading}
          closeModal={closeUploadModal}
          uploadFiles={uploadFiles}
          selectedFiles={selectedFiles}
          uploadDetails={uploadDetails}
          progress={progress}
          currentUploadIndx={currentUploadIndx}
        />

        <NewFolderModal
          folderModalRef={folderModalRef}
        />

        {children}
      </>
    </ModalContext.Provider>
  );
};

const useModalContext = (): IModalContext => useContext(ModalContext) as IModalContext;

export {
  ModalContextProvider,
  useModalContext,
};
