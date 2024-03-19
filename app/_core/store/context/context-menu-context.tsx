'use client';

/* FILE_DESC +=> =====================================================================
| This file provides the context menu modal and only the CONTENT needed for the main |
| context menu                                                                       |
=====================================================================//=============*/

import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { ContextMenu } from '@/components/modals';
import { openFileUploadDialog } from '@/utils/helpers';
import { useModalContext } from '.';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';
import type { IDocument } from '@/interfaces/entities';

interface IContextCoordinates {
  top: string;
  left: string;
}

interface IContextMenuContextProvider {
  setContextCoordinates: Dispatch<SetStateAction<IContextCoordinates>>;

  setContextContent: Dispatch<SetStateAction<ContextMenuContent[]>>;

  contextMenuRef: RefObject<IModalWrapperRef>;

  // selection
  selectionStart: boolean; setSelectionStart: Dispatch<SetStateAction<boolean>>;
  selectedDocs: string[]; setSelectedDocs: Dispatch<SetStateAction<string[]>>;
  handleDocumentSelection: (doc: IDocument) => void;

  // context menu content
  MAIN_CONTEXT_MENU_CONTENT: ContextMenuContent[];
};

const ContextMenuContext = createContext<IContextMenuContextProvider | null>(null);

const ContextMenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextCoordinates, setContextCoordinates] = useState<IContextCoordinates>({ top: '0', left: '0' });
  const [contextContent, setContextContent] = useState<ContextMenuContent[]>([]);

  const [selectionStart, setSelectionStart] = useState<boolean>(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

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

  const handleDocumentSelection = (document: IDocument) => {
    /* FUNC_DESC +=> =========================================
    | This function handles selection actions for both files |
    | and folders                                            |
    ==========================================//============*/

    console.log('document includes?', selectedDocs.includes(document.id));
    console.log(selectedDocs);

    if (!selectionStart) setSelectionStart(true);

    if (selectedDocs.includes(document.id)) {
      const update = selectedDocs.filter(doc_id => doc_id !== document.id);
      setSelectedDocs(update);
      return;
    }

    setSelectedDocs((prev) => [...prev, document.id]);
  };

  const contextValue = useMemo<Omit<IContextMenuContextProvider, 'handleDocumentSelection'>>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,

    // selection
    selectionStart, setSelectionStart,
    selectedDocs, setSelectedDocs,
    // handleDocumentSelection,

    MAIN_CONTEXT_MENU_CONTENT,
  }), [selectionStart, selectedDocs]);

  return (
    <ContextMenuContext.Provider value={{...contextValue, handleDocumentSelection}}>
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
