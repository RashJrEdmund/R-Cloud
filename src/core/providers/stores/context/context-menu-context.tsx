"use client";

/* FILE_DESC +=> =====================================================================
| This file provides the context menu modal and only the CONTENT needed for the main |
| context menu                                                                       |
=====================================================================//=============*/

import { createContext, useContext, useState, useMemo } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Document } from "@/core/interfaces/entities";

interface ContextMenuContextProviderType {
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
  const [selectionStart, setSelectionStart] = useState<boolean>(false);
  const [selectedDocs, setSelectedDocs] = useState<Document[]>([]);

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
    }

    setSelectionStart(true);
  };

  const contextValue = useMemo<ContextMenuContextProviderType>(
    () => ({
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
      <>{children}</>
    </ContextMenuContext.Provider>
  );
};

const useContextMenuStore = (): ContextMenuContextProviderType =>
  useContext(ContextMenuContext) as ContextMenuContextProviderType;

export { ContextMenuContextProvider, useContextMenuStore };
