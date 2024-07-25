"use client";

/* FILE_DESC +=> =====================================================================
| This file provides the context menu modal and only the CONTENT needed for the main |
| context menu                                                                       |
=====================================================================//=============*/

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { ContextMenu } from "@/components/modals";
import { getResponsiveMenuPosition } from "@/core/utils/helpers";

import type { Dispatch, SetStateAction, RefObject } from "react";
import type { ModalWrapperRef } from "@/components/modals/generics";
import type { ContextMenuContentType } from "@/core/interfaces/app";
import type { Document } from "@/core/interfaces/entities";

interface ContextCoordinates {
  top: string;
  left: string;
}

interface HandleDocCardContextMenu {
  event: MouseEvent;
  CONTEXT_MENU_CONTENT: ContextMenuContentType[];
}

interface ContextMenuContextProviderType {
  // context menu
  setContextCoordinates: Dispatch<SetStateAction<ContextCoordinates>>;
  setContextContent: Dispatch<SetStateAction<ContextMenuContentType[]>>;
  contextMenuRef: RefObject<ModalWrapperRef>;
  handleDocCardContextMenu: (props: HandleDocCardContextMenu) => void;

  // selection
  selectionStart: boolean;
  setSelectionStart: Dispatch<SetStateAction<boolean>>;
  selectedDocs: Document[];
  setSelectedDocs: Dispatch<SetStateAction<Document[]>>;
  handleDocumentSelection: (doc: Document) => void;
  toggleDocumentSelection: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextProviderType | null>(
  null
);

const ContextMenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextCoordinates, setContextCoordinates] =
    useState<ContextCoordinates>({ top: "0", left: "0" });
  const [contextContent, setContextContent] = useState<ContextMenuContentType[]>(
    []
  );

  const [selectionStart, setSelectionStart] = useState<boolean>(false);
  const [selectedDocs, setSelectedDocs] = useState<Document[]>([]);

  const contextMenuRef = useRef<ModalWrapperRef>(null);

  const handleDocCardContextMenu = ({
    event: e,
    CONTEXT_MENU_CONTENT,
  }: HandleDocCardContextMenu) => {
    /* FUNC_DESC +=> ==========================================
    | This function handles opening the context menu for both |
    | the file and folder cards.                              |
    ==========================================//=============*/
    e.preventDefault();

    if (selectionStart) return;

    e.stopPropagation();

    const coordinates = getResponsiveMenuPosition(e);
    setContextCoordinates({
      top: coordinates.y + "px",
      left: coordinates.x + "px",
    });

    setContextContent(CONTEXT_MENU_CONTENT);

    contextMenuRef.current?.open();
  };

  const handleDocumentSelection = (document: Document) => {
    /* FUNC_DESC +=> =========================================
    | This function handles selection actions for both files |
    | and folders                                            |
    ==========================================//============*/

    if (!selectionStart) setSelectionStart(true);

    if (selectedDocs.find((doc) => doc.id === document.id)) {
      const update = selectedDocs.filter((doc) => doc.id !== document.id);
      setSelectedDocs(update);
      return;
    }

    setSelectedDocs((prev) => [...prev, document]);
  };

  const toggleDocumentSelection = () => {
    if (selectionStart) {
      // then we should stop selection
      setSelectionStart(false);
      setSelectedDocs([]);
      return;
    };

    setSelectionStart(true);
  };

  const contextValue = useMemo<ContextMenuContextProviderType>(
    () => ({
      setContextCoordinates,
      setContextContent,
      contextMenuRef,
      handleDocCardContextMenu,

      // selection
      selectionStart,
      setSelectionStart,
      selectedDocs,
      setSelectedDocs,
      handleDocumentSelection,
      toggleDocumentSelection,
    }),
    [selectionStart, selectedDocs]
  );

  // useEffect(() => {
  //   console.log('selectedDocs', selectedDocs);
  // }, [selectedDocs]);

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

const useContextMenuContext = (): ContextMenuContextProviderType =>
  useContext(ContextMenuContext) as ContextMenuContextProviderType;

export { ContextMenuContextProvider, useContextMenuContext };
