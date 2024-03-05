'use client';

/* FILE_DESC +=> =====================================================================
| This file provides the context menu modal and only the CONTENT needed for the main |
| context menu                                                                       |
=====================================================================//=============*/

import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { ContextMenu } from '@/components/modals';
import { openFileUploadDialog } from '@/utils/helpers';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';
import { useModalContext } from '.';

interface IContextCoordinates {
  top: string;
  left: string;
}

interface IContextMenuContextProvider {
  setContextCoordinates: Dispatch<SetStateAction<IContextCoordinates>>;

  setContextContent: Dispatch<SetStateAction<ContextMenuContent[]>>;

  contextMenuRef: RefObject<IModalWrapperRef>;

  // context menu content
  MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[];
};

const ContextMenuContext = createContext<IContextMenuContextProvider | null>(null);

const ContextMenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextCoordinates, setContextCoordinates] = useState<IContextCoordinates>({ top: '0', left: '0' });
  const [contextContent, setContextContent] = useState<ContextMenuContent[]>([]);

  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const { openNewFolderModal } = useModalContext();

  const MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[] = useMemo(() => [
    {
      text: 'New Folder',
      icon_url: '/icons/modal-icons/new-folder-icon.svg',
      action: openNewFolderModal,
    },
    {
      text: 'Upload File(s)',
      icon_url: '/icons/modal-icons/upload-icon.svg',
      action: openFileUploadDialog,
    },
  ], []);

  const contextValue = useMemo<IContextMenuContextProvider>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,

    MAIN_CONTEXT_MENU_CONTENT,
  }), []);

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <>
        <ContextMenu
          ref={contextMenuRef}
          content={contextContent}
          top={contextCoordinates.top}
          left={contextCoordinates.left}
        />

        {children}
      </>
    </ContextMenuContext.Provider>
  );
};

const useContextMenuContext = (): IContextMenuContextProvider => useContext(ContextMenuContext) as IContextMenuContextProvider;

export {
  ContextMenuContextProvider,
  useContextMenuContext,
};
