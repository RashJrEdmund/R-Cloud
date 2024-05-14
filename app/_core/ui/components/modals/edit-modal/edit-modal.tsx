'use client';

import { useMemo, useEffect, useState } from 'react';
import { AppModalWrapper } from '@/components/modals/generics';
import { TextTag, DivCard } from '@/components/atoms';
import { InputField } from '@/components/molecules';
import { useDocStore, useUserStore } from '@/store/zustand';
import { renameDocument } from '@/core/config/firebase/fire-store';

import type { MutableRefObject, FormEventHandler } from 'react';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { IDocument } from '@/interfaces/entities';
import { toast } from 'sonner';

interface Props {
  editModalRef: MutableRefObject<IModalWrapperRef | undefined>;
  document: IDocument | null;
};

export default function EditModal({
  editModalRef,
  document,
}: Props) {
  const [docName, setDocName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { documents, setDocuments } = useDocStore();

  const { currentUser } = useUserStore();

  const doc_type = useMemo(() => document?.type === 'FOLDER' ? 'Folder' : 'File', [document?.type]);

  const closeModal = () => {
    editModalRef.current?.close();
    setIsLoading(false);
  };

  const handleEditDocument: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (!docName.trim() || !currentUser) return;
    try {
      setIsLoading(true);

      await renameDocument(currentUser.email, String(document?.id), docName)
        .then(() => {
          // trying to reflect updates without toggling refetch.

          const update = documents?.map((doc) => {
            if (doc.id === document?.id) return {
              ...doc,
              name: docName,
            };

            return doc;
          });

          setDocuments(update as IDocument[]);
          toast.info('Update successful', {
            description: `Successfully renamed folder from ${document?.name} to ${docName}`
          });
        });
    } catch (error) {
      // console.warn(error);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    if (document) setDocName(document.name);
  }, [document]);

  return (
    <AppModalWrapper ref={editModalRef as MutableRefObject<IModalWrapperRef>}
      use_base_btns_instead
      isLoading={isLoading}
      confirmMsg='Accept'
      loadingMsg='Editing...'
      cancelAction={closeModal}
      confirmAction={handleEditDocument}
    >
      <DivCard as='form' width='100%' flex_dir='column' align='start' justify='start' gap='10px'
        onSubmit={handleEditDocument}
      >
        <TextTag>
          Rename {doc_type}
        </TextTag>

        <InputField
          leave_active
          field_title={`${doc_type} name`}
          field_name='document-name'
          value={docName}
          onValueChange={(e) => setDocName(e.target.value)}
          error={null}
        />
      </DivCard>
    </AppModalWrapper>
  );
};
