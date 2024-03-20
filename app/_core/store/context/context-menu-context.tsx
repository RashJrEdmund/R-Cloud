'use client';

/* FILE_DESC +=> =====================================================================
| This file provides the context menu modal and only the CONTENT needed for the main |
| context menu                                                                       |
=====================================================================//=============*/

import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { ContextMenu } from '@/components/modals';
import { getResponsiveMenuPosition } from '@/utils/helpers';

import type { Dispatch, SetStateAction, RefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';
import type { IDocument } from '@/interfaces/entities';

interface IContextCoordinates {
  top: string;
  left: string;
}

interface IHandleDocCardContextMenu {
  event: MouseEvent;
  CONTEXT_MENU_CONTENT: ContextMenuContent[];
}

interface IContextMenuContextProvider {
  // context menu
  setContextCoordinates: Dispatch<SetStateAction<IContextCoordinates>>;
  setContextContent: Dispatch<SetStateAction<ContextMenuContent[]>>;
  contextMenuRef: RefObject<IModalWrapperRef>;
  handleDocCardContextMenu: (props: IHandleDocCardContextMenu) => void;

  // selection
  selectionStart: boolean; setSelectionStart: Dispatch<SetStateAction<boolean>>;
  selectedDocs: string[]; setSelectedDocs: Dispatch<SetStateAction<string[]>>;
  handleDocumentSelection: (doc: IDocument) => void;
  stopDocumentSelection: () => void;
};

const ContextMenuContext = createContext<IContextMenuContextProvider | null>(null);

const ContextMenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextCoordinates, setContextCoordinates] = useState<IContextCoordinates>({ top: '0', left: '0' });
  const [contextContent, setContextContent] = useState<ContextMenuContent[]>([]);

  const [selectionStart, setSelectionStart] = useState<boolean>(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const contextMenuRef = useRef<IModalWrapperRef>(null);

  const handleDocCardContextMenu = ({ event: e, CONTEXT_MENU_CONTENT }: IHandleDocCardContextMenu) => {
    /* FUNC_DESC +=> ==========================================
    | This function handles opening the context menu for both |
    | the file and folder cards.                              |
    ==========================================//=============*/
    e.preventDefault();

    if (selectionStart) return;

    e.stopPropagation();

    const coordinates = getResponsiveMenuPosition(e);
    setContextCoordinates({ top: coordinates.y + 'px', left: coordinates.x + 'px' });

    setContextContent(CONTEXT_MENU_CONTENT);

    contextMenuRef.current?.open();
  };

  const handleDocumentSelection = (document: IDocument) => {
    /* FUNC_DESC +=> =========================================
    | This function handles selection actions for both files |
    | and folders                                            |
    ==========================================//============*/

    if (!selectionStart) setSelectionStart(true);

    if (selectedDocs.includes(document.id)) {
      const update = selectedDocs.filter(doc_id => doc_id !== document.id);
      setSelectedDocs(update);
      return;
    }

    setSelectedDocs((prev) => [...prev, document.id]);
  };

  const stopDocumentSelection = () => {
    if (selectionStart) { // then we should stop selection
      setSelectionStart(false);
      setSelectedDocs([]);
      return;
    }

    setSelectionStart(true);
  };

  const contextValue = useMemo<IContextMenuContextProvider>(() => ({
    setContextCoordinates,
    setContextContent,
    contextMenuRef,
    handleDocCardContextMenu,

    // selection
    selectionStart, setSelectionStart,
    selectedDocs, setSelectedDocs,
    handleDocumentSelection,
    stopDocumentSelection,
  }), [selectionStart, selectedDocs]);

  return (
    <ContextMenuContext.Provider value={{ ...contextValue }}>
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
