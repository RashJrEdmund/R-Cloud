'use client';

import { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';

import { ContextMenu } from '@/components/modals';

interface IContextCoordinates {
  top: string;
  left: string;
}

interface IFilesFolderDisplayContext {
  setContextCoordinates: Dispatch<SetStateAction<IContextCoordinates>>;

  setContextContent: Dispatch<SetStateAction<ContextMenuContent[]>>;

  contextMenuRef: RefObject<IModalWrapperRef>;

  handleUploadFiles: (files: FileList, items?: DataTransferItemList) => void;
};

const FilesFolderDisplayContext = createContext<IFilesFolderDisplayContext | null>(null);

const FilesFolderDisplayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextCoordinates, setContextCoordinates] = useState<IContextCoordinates>({ top: '0', left: '0' });
  const [contextContent, setContextContent] = useState<ContextMenuContent[]>([]);

  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const handleUploadFiles = (files: FileList, items?: DataTransferItemList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log(file.size);
    };

    console.log(files, items);
  };

  const contextValue = useMemo<IFilesFolderDisplayContext>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,
    handleUploadFiles,
  }), []);

  return (
    <FilesFolderDisplayContext.Provider value={contextValue}>
      <>
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
