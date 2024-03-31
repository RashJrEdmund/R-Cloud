'use client';

import { useMemo, useState } from 'react';
import { AppModalWrapper } from '@/components/modals/generics';
import { TextTag, DivCard } from '@/components/atoms';
import { useDocStore, useUserStore } from '@/store/zustand';
import { deleteFiles, deleteFolders } from '@/core/config/firebase/fire-store';

import type { MutableRefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';

interface Props {
  deleteModalRef: MutableRefObject<IModalWrapperRef | undefined>;
  document: IDocument | null;
};

export default function DeleteModal({
  deleteModalRef,
  document,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { currentUser } = useUserStore();

  const doc_type = useMemo(() => document?.type === 'FOLDER' ? 'Folder' : 'File', [document?.type]);

  const closeModal = () => {
    deleteModalRef.current?.close();
    setIsLoading(false);
  };

  const handleDeleteDocument = async () => {
    if (!document) return;

    try {
      setIsLoading(true);

      const email = String(currentUser?.email);

      if (document.type === 'FILE') {
        await deleteFiles(email, [document]);
      } else {
        await deleteFolders(email, [document]);
      }

      // I don't wanna use toggleRefetchPath() just after deleting a single file or folder

      const update_docs = (documents as IDocument[]).filter((doc) => doc.id !== document.id);

      setDocuments(update_docs);
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      // toggleRefetchPath();
    }
  };

  return (
    <AppModalWrapper ref={deleteModalRef as any}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg='Delete'
      loadingMsg='Deleting...'
      cancelAction={closeModal}
      confirmAction={handleDeleteDocument}
    >
      <DivCard width='100%' flex_dir='column' align='start' justify='start' gap='10px'
      >
        <TextTag text_align='left'>
          Are you sure you want to delete this {doc_type}
        </TextTag>

        {document?.type === 'FOLDER' && Number(document?.capacity.bytes) > 0 ? (
          <TextTag color_type='error' text_align='left'>
            Deleting this folder will delete all it&apos;s content
          </TextTag>
        ) : null}

        <TextTag text_align='left'>
          name:
          <TextTag color_type='success'>
            {document?.name}
          </TextTag>
        </TextTag>

        {document?.type === 'FILE' ? (
          <TextTag text_align='left'>
            size:
            <TextTag color_type='success' text_align='left'>
              {document?.capacity.size}
            </TextTag>
          </TextTag>
        ) : (
          <TextTag text_align='left'>
            Capacity:
            <TextTag color_type='success'>
              {Number(document?.capacity.bytes) <= 0 ? 'Empty' : document?.capacity.size}
            </TextTag>
          </TextTag>
        )}
      </DivCard>
    </AppModalWrapper>
  );
};
