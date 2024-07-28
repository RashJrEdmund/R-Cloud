"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* FILE_DESC +=> ====================================
| Meant to read current dynamic route and fetch data |
| for the parent folder                              |
========================================//==========*/

import { useEffect, useCallback } from "react";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import type { Document } from "@/core/interfaces/entities";
import {
  getOneDocument,
  listFolderDocuments,
} from "@/core/config/firebase/fire-store";
import type { DocumentSnapshot } from "firebase/firestore";

interface Props {
  children: React.ReactNode;
}

export default function PathWrapper({ children }: Props) {
  const router = useRouter();
  const params = useParams<{ folder_id: string }>();
  const searchParams = useSearchParams();

  const { currentUser } = useUserStore();
  const {
    setDocuments,
    setLoadingDocs,

    setCurrentFolder,
    setLoadingCurrentFolder,

    refetchDocs,
  } = useDocStore();

  const fetchDocuments = useCallback(async (folder_id: string) => {
    let folder: DocumentSnapshot<Document> | null = null;

    if (params.folder_id) {
      folder = await getOneDocument(currentUser?.email || "", params.folder_id);
    }

    if (folder && !folder.exists()) {
      return router.replace("/r-drive/root"); // going back to root;
    }

    if (folder?.exists()) setCurrentFolder({ ...folder.data(), id: folder.id });
    else if (folder_id === "root") setCurrentFolder("root");

    setLoadingCurrentFolder(false);

    listFolderDocuments(currentUser?.email || "", folder_id)
      .then((res) => {
        if (res.empty) {
          setDocuments([]);
          return;
        }

        setDocuments(
          res.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            metadata: doc.metadata,
          }))
        );
      })
      .finally(() => {
        setLoadingDocs(false);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get("viewing")) return; // meaning a file is currently opened.

    setLoadingDocs(true);
    setLoadingCurrentFolder(true);

    fetchDocuments(params.folder_id || "root");
    return () => {
      setDocuments(null);
    };
  }, [params, refetchDocs, searchParams]);

  return <>{children}</>;
}
