'use client';

import { useState } from 'react';
import { AppModalWrapper } from '@/components/modals/generics';
import { TextTag, DivCard } from '@/components/atoms';
import { InputField } from '@/components/molecules';
import { useDocStore, useUserStore } from '@/store/zustand';
import { useParams } from 'next/navigation';
import { createFileDoc, updateFolderSize } from '@/core/config/firebase/fire-store';

import type { MutableRefObject, FormEventHandler } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';

interface Props {
  folderModalRef: MutableRefObject<IModalWrapperRef | undefined>;
};

export default function NewFolderModal({
  folderModalRef,
}: Props) {
  const [folderName, setFolderName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleRefetchPath } = useDocStore();

  const { currentUser } = useUserStore();

  const params = useParams<{ folder_id: string }>();

  const closeModal = () => {
    folderModalRef.current?.close();
    setIsLoading(false);
  };

  const uploadFolder: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (!folderName.trim() || !currentUser) return;
    try {
      setIsLoading(true);

      const new_folder: Omit<IDocument, 'id'> = {
        user_id: currentUser.id,
        name: folderName,
        parent_id: params.folder_id || 'root',
        type: 'FOLDER',
        content_type: null,
        download_url: null,
        extension: null,
        capacity: {
          size: '0 Bytes',
          bytes: 0,
          length: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createFileDoc(currentUser.email, new_folder as IDocument);

      if (params.folder_id) {
        await updateFolderSize(currentUser.email, params.folder_id, { bytes: 0, length: 1 });
      }

    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      toggleRefetchPath();
    }
  };

  return (
    <AppModalWrapper ref={folderModalRef as any}
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg='Create'
      loadingMsg='Creating...'
      cancelAction={closeModal}
      confirmAction={uploadFolder}
    >
      <DivCard as='form' width='100%' flex_dir='column' align='start' justify='start' gap='10px'
        onSubmit={uploadFolder}
      >
        <TextTag>
          New Folder
        </TextTag>

        <InputField
          leave_active
          field_title='Folder name'
          field_name='folder-name'
          value={folderName}
          onValueChange={(e) => setFolderName(e.target.value)}
          error={null}
        />
      </DivCard>
    </AppModalWrapper>
  );
};
