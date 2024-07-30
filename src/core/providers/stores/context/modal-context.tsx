"use client";

/* FILE_DESC +=> ====================================================================
| This file provides all data and modals needed in the FilesFolderDisplay component |
| in app/_core/ui/components/files-folder-display/files-folder-display.tsx          |
=====================================================================//============*/
import type { Dispatch, SetStateAction } from "react";
import type { Document } from "@/core/interfaces/entities";

import {
  createContext,
  useContext,
  useState,
} from "react";
import {
  BulkDeleteModal,
  DeleteModal,
  EditModal,
  FileViewer,
  NewFolderModal,
} from "@/components/modals";

interface ModalContextType {
  newFolderDialogOpen: boolean;
  setNewFolderDialogOpen: Dispatch<SetStateAction<boolean>>;

  editDialogOpen: boolean;
  setEditDialogOpen: Dispatch<SetStateAction<boolean>>;

  deleteDialogOpen: boolean;
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  bulkDeleteDialogOpen: boolean;
  setBulkDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  // openNewFolderModal: () => void;
  openEditDocumentModal: (_: Document) => void;
  openDeleteDocumentModal: (_: Document) => void;
  openBulkDeleteModal: (selectedDocs: Document[]) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // START MODAL TOGGLE STATES
  const [newFolderDialogOpen, setNewFolderDialogOpen] =
    useState<boolean>(false);

  const [editDialogOpen, setEditDialogOpen] =
    useState<boolean>(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState<boolean>(false);

  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState<boolean>(false);

  // END MODAL TOGGLE STATES
  const [documentToBeEdited, setDocumentToBeEdited] = useState<Document | null>(
    null
  );
  const [documentToBeDeleted, setDocumentToBeDeleted] =
    useState<Document | null>(null);

  const [docsToDelete, setDocsToDelete] = useState<Document[]>([]);

  const openEditDocumentModal = (document: Document) => {
    setDocumentToBeEdited(document);
    setEditDialogOpen(true);
  };

  const openDeleteDocumentModal = (document: Document) => {
    setDocumentToBeDeleted(document);
    setDeleteDialogOpen(true);
  };

  const openBulkDeleteModal = (selectedDocs: Document[]) => {
    setDocsToDelete(selectedDocs);
    setBulkDeleteDialogOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        newFolderDialogOpen, setNewFolderDialogOpen,

        editDialogOpen, setEditDialogOpen,

        deleteDialogOpen, setDeleteDialogOpen,

        bulkDeleteDialogOpen, setBulkDeleteDialogOpen,

        openEditDocumentModal,
        openDeleteDocumentModal,
        openBulkDeleteModal,
      }}
    >
      <>
        <NewFolderModal />

        <EditModal
          document={documentToBeEdited}
        />

        <DeleteModal
          document={documentToBeDeleted}
        />

        <BulkDeleteModal
          selectedDocs={docsToDelete}
        />

        <FileViewer />
        {/* Uses search params to open or close, so has no need for ref, or any other props */}
        {children}
      </>
    </ModalContext.Provider>
  );
};

const useModalContext = (): ModalContextType =>
  useContext(ModalContext) as ModalContextType;

export { ModalContextProvider, useModalContext };
