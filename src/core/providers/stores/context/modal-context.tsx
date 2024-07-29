"use client";

/* FILE_DESC +=> ====================================================================
| This file provides all data and modals needed in the FilesFolderDisplay component |
| in app/_core/ui/components/files-folder-display/files-folder-display.tsx          |
=====================================================================//============*/

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  BulkDeleteModal,
  DeleteModal,
  EditModal,
  FileViewer,
  NewFolderModal,
  UploadModal,
} from "@/components/modals";
import { uploadFile } from "@/core/config/firebase";
import { useDocStore, useUserStore } from "../zustand";
import {
  createFileDoc,
  updateFolderSize,
  updateUsedSpace,
} from "@/core/config/firebase/fire-store";
import { getFileName, getSizeFromBytes } from "@/core/utils/file-utils";
import { useParams } from "next/navigation";

import type { ModalWrapperRef } from "@/components/modals/generics";
import type { Document } from "@/core/interfaces/entities";

interface IUploadDetails {
  total_size: number;
  count: number;
}

interface IModalContext {
  newFolderDialogOpen: boolean;
  setNewFolderDialogOpen: Dispatch<SetStateAction<boolean>>;

  editDialogOpen: boolean;
  setEditDialogOpen: Dispatch<SetStateAction<boolean>>;

  deleteDialogOpen: boolean;
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;

  readyUploadModal: (files: FileList, items?: DataTransferItemList) => void;
  // openNewFolderModal: () => void;
  openEditDocumentModal: (_: Document) => void;
  openDeleteDocumentModal: (_: Document) => void;
  openBulkDeleteModal: (selectedDocs: Document[]) => void;
};

const ModalContext = createContext<IModalContext | null>(null);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // START MODAL TOGGLE STATES
  const [newFolderDialogOpen, setNewFolderDialogOpen] =
    useState<boolean>(false);

  const [editDialogOpen, setEditDialogOpen] =
    useState<boolean>(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState<boolean>(false);

  // END MODAL TOGGLE STATES
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadDetails, setUploadDetails] = useState<IUploadDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ [key: number]: number } | null>(
    null
  );
  const [currentUploadIndx, setCurrentUploadIndx] = useState<number>(0);
  const [documentToBeEdited, setDocumentToBeEdited] = useState<Document | null>(
    null
  );
  const [documentToBeDeleted, setDocumentToBeDeleted] =
    useState<Document | null>(null);
  const [docsToDelete, setDocsToDelete] = useState<Document[]>([]);

  const { currentUser } = useUserStore();
  const { toggleRefetchDocs, currentFolder } = useDocStore();

  const uploadModalRef = useRef<ModalWrapperRef>();
  const bulkDeleteModalRef = useRef<ModalWrapperRef>();

  const params = useParams<{ folder_id: string }>();

  const closeUploadModal = () => {
    uploadModalRef.current?.close();
    setSelectedFiles([]);
    setUploadDetails(null);
    setProgress(null);

    const fileUploadField =
      document.querySelector<HTMLInputElement>("#file-upload-field");

    if (fileUploadField) fileUploadField.value = ""; // making sure upload file is cleared after file selection.
  };

  const readyUploadModal = (files: FileList, items?: DataTransferItemList) => {
    const file_arr = [];
    let total_size = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type) continue;
      file_arr.push(file);
      total_size += file.size;
    }

    setSelectedFiles(file_arr);
    setUploadDetails({ total_size, count: file_arr.length });

    uploadModalRef.current?.open();
  };

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
    bulkDeleteModalRef.current?.open();
  };

  const uploadFiles = useCallback(async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);

      const completed = { bytes: 0, length: 0 }; // to keep track of successfully completed uploads;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        setCurrentUploadIndx(i);
        const { download_url, filename } = await uploadFile(
          file,
          currentUser.email,
          (progress) => setProgress({ [i]: progress })
        );

        const ancestor_ids =
          currentFolder === "root"
            ? ["root"]
            : [...currentFolder.ancestor_ids, currentFolder.id]; // inheriting the parent's ancestor ids and the parent's own id

        const document: Omit<Document, "id"> = {
          download_url,
          filename,
          user_id: currentUser.id,
          name: getFileName(file, { without_extension: true }),
          parent_id: params.folder_id || "root",
          ancestor_ids,
          type: "FILE",
          content_type: file.type,
          extension: getFileName(file, { only_extension: true }),
          capacity: {
            size: getSizeFromBytes(file.size).merged,
            bytes: file.size,
            length: null,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await createFileDoc(currentUser.email, document as Document);
        completed.bytes += file.size;
        completed.length += 1;
      }

      if (params.folder_id) {
        await updateFolderSize(currentUser.email, params.folder_id, completed);
      }

      await updateUsedSpace(currentUser.email, completed.bytes);
    } catch (error) {
      // console.warn(error);
    } finally {
      setIsLoading(false);
      closeUploadModal();
      toggleRefetchDocs();
    }
  }, [
    currentUser,
    params.folder_id,
    selectedFiles,
    currentFolder,
    toggleRefetchDocs,
  ]);

  // useEffect(() => {
  //   if (progress) console.log('progress changing', progress);
  // }, [progress]);

  return (
    <ModalContext.Provider
      value={{
        newFolderDialogOpen, setNewFolderDialogOpen,

        editDialogOpen, setEditDialogOpen,

        deleteDialogOpen, setDeleteDialogOpen,

        readyUploadModal,
        openEditDocumentModal,
        openDeleteDocumentModal,
        openBulkDeleteModal,
      }}
    >
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

        <NewFolderModal />

        <EditModal
          document={documentToBeEdited}
        />

        <DeleteModal
          document={documentToBeDeleted}
        />

        <BulkDeleteModal
          bulkDeleteModalRef={bulkDeleteModalRef}
          selectedDocs={docsToDelete}
        />

        <FileViewer />
        {/* Uses search params to open or close, so has no need for ref, or any other props */}
        {children}
      </>
    </ModalContext.Provider>
  );
};

const useModalContext = (): IModalContext =>
  useContext(ModalContext) as IModalContext;

export { ModalContextProvider, useModalContext };
