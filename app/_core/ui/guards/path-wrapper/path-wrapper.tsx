'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* FILE_DESC +=> ====================================
| Meant to read current dynamic route and fetch data |
| for the parent folder                              |
========================================//==========*/

import { useState, useEffect, useCallback } from 'react';
import { useDocStore, useUserStore } from '@/store/zustand';

import { useParams } from 'next/navigation';
import { Streamer } from '@/components/molecules';
import { dummyData } from '../../ui-constants';

import type { IDocument } from '@/interfaces/entities';
import { listFolderFiles } from '@/core/config/firebase/fire-store';

interface Props {
  children: React.ReactNode;
};

export default function PathWrapper({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ folder_id: string }>();

  const { currentUser } = useUserStore();
  const { setDocuments } = useDocStore();

  // const content: IDocument[] = [];

  const fetchDocuments = useCallback(async (folder_id: string) => {
    listFolderFiles(currentUser?.email || '', folder_id)
      .then(res => {
        if (res.empty) {
          setDocuments([]);
          return;
        };

        const data: IDocument[] = [];

        res.forEach((doc) => {
          const _: IDocument = { ...doc.data(), id: doc.id, metadata: doc.metadata } as IDocument;
          data.push(_);
        });

        setDocuments(data);
      });
  }, []);

  useEffect(() => {
    fetchDocuments(params.folder_id || 'root')
      .finally(() => {
        setLoading(false);
      });

    // fetch default home/root data. i.e data from supposed root director
  }, [params]);

  if (loading) return <Streamer />;

  return (
    <>
      {children}
    </>
  );
};
