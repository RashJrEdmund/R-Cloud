'use client';

import { useMemo, useState } from 'react';
import { AppModalWrapper } from '@/components/modals/generics';
import { TextTag, DivCard } from '@/components/atoms';
import { useDocStore, useUserStore } from '@/store/zustand';
import { deleteDocuments } from '@/core/config/firebase/fire-store';
import { getSizeFromBytes } from '@/utils/file-utils';

import type { MutableRefObject } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';

interface Props {
  bulkDeleteModalRef: MutableRefObject<IModalWrapperRef | undefined>;
  selectedDocs: IDocument[];
};

export default function BulkDeleteModal({
  bulkDeleteModalRef,
  selectedDocs,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleRefetchPath } = useDocStore();

  const { currentUser } = useUserStore();

  const selectedDocDetails = useMemo(() => {
    const num_files = selectedDocs.filter(doc => doc.type === 'FILE').length;
    const num_folders = selectedDocs.length - num_files;

    const total_bytes = selectedDocs.reduce((acc, { capacity: { bytes } }) => acc + bytes, 0);

    return {
      num_files,
      num_folders,
      total: selectedDocs.length,
      has_folders: num_folders > 0,
      capacity: getSizeFromBytes(total_bytes),
    }
  }, [selectedDocs]);

  const closeModal = () => {
    bulkDeleteModalRef.current?.close();
    setIsLoading(false);
  };

  const handleDeleteDocuments = async () => {
    if (selectedDocs.length <= 0) return;

    try {
      setIsLoading(true);

      const email = String(currentUser?.email);

      await deleteDocuments(email, selectedDocs);

      // I don't wanna use toggleRefetchPath() just after deleting a single file or folder

      toggleRefetchPath();
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
      // toggleRefetchPath();
    }
  };

  return (
    <AppModalWrapper ref={bulkDeleteModalRef as any}
      prevent_auto_focus
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg='Delete'
      loadingMsg='Deleting...'
      cancelAction={closeModal}
      confirmAction={handleDeleteDocuments}
    >
      <DivCard width='100%' flex_dir='column' align='start' justify='start' gap='10px'
      >
        <TextTag text_align='left'>
          Are you sure you want to the delete selected
        </TextTag>

        {selectedDocDetails.has_folders ? (
          <TextTag color_type='error' text_align='left'>
            Folders detected. Deleting folders will delete their content
          </TextTag>
        ) : null}

        <TextTag text_align='left'>
          Files:
          <TextTag color_type='success'>
            {selectedDocDetails.num_files}
          </TextTag>
        </TextTag>

        <TextTag text_align='left'>
          Folders:
          <TextTag color_type='success'>
            {selectedDocDetails.num_folders}
          </TextTag>
        </TextTag>

        <TextTag text_align='left'>
          Size, {selectedDocDetails.has_folders ? <TextTag color_type='success' text_align='left'>Excluding sub folders</TextTag> : ''}:
          <TextTag color_type='success'>
            {selectedDocDetails.capacity.merged}
          </TextTag>
        </TextTag>
      </DivCard>
    </AppModalWrapper>
  );
};
