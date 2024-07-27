"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* FILE_DESC +=> ====================================
| Meant to read current dynamic route and fetch data |
| for the parent folder                              |
========================================//==========*/

import { useEffect, useCallback } from "react";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";

import { useParams, useRouter } from "next/navigation";

import type { Document } from "@/core/interfaces/entities";
import {
  getOneDocument,
  listFolderDocuments,
} from "@/core/config/firebase/fire-store";
import type { DocumentSnapshot } from "firebase/firestore";

interface Props {
  children: React.ReactNode;
};

export default function PathWrapper({ children }: Props) {
  const router = useRouter();
  const params = useParams<{ folder_id: string }>();

  const { currentUser } = useUserStore();
  const {
    setDocuments,
    setLoadingDocs,

    setCurrentFolder,
    setLoadingCurrentFolder,

    refetchDocs,
  } = useDocStore();

  // const content: Document[] = [];

  const fetchDocuments = useCallback(async (folder_id: string) => {
    let folder: DocumentSnapshot<Document> | null = null;

    if (params.folder_id) {
      folder = await getOneDocument(currentUser?.email || "", params.folder_id);
    };
    
    console.log({
      if_folder_before_if_statement: folder
    });
    if (folder && !folder.exists()) {
      console.log({
        if_folder_in_if_statement: folder
      });

      return router.replace("/r-drive/root"); // going back to root;
    };

    setLoadingCurrentFolder(false);

    if (folder?.exists()) setCurrentFolder({ ...folder.data(), id: folder.id });

    listFolderDocuments(currentUser?.email || "", folder_id).then((res) => {
      if (res.empty) {
        setDocuments([]);
        setLoadingDocs(false);
        return;
      };

      setDocuments(res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        metadata: doc.metadata,
      })));
    });
  }, []);

  useEffect(() => {
    setLoadingDocs(true);
    setLoadingCurrentFolder(true);

    fetchDocuments(params.folder_id || "root").finally(() => {
      setLoadingDocs(false);
    });

    // fetch default r-drive/root data. i.e data from supposed root director
    return () => {
      setDocuments(null);
    };
  }, [params, refetchDocs]);

  return <>{children}</>;
}
