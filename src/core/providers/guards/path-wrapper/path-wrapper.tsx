"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useCallback } from "react";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Document } from "@/core/interfaces/entities";
import {
  getOneDocument,
  listFolderDocuments,
} from "@/core/config/firebase/fire-store";
import type { DocumentSnapshot } from "firebase/firestore";

interface Props {
  children: React.ReactNode;
}

/**
 * Meant to read current dynamic route and fetch data for the parent folder
*/
export default function PathWrapper({ children }: Props) {
  const router = useRouter();
  const params = useParams<{ folder_id: string }>();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { currentUser } = useUserStore();
  const {
    documents,
    setDocuments,
    setLoadingDocs,

    setCurrentFolder,
    setLoadingCurrentFolder,

    refetchDocs,
  } = useDocStore();


  const fetchDocuments = useCallback(async (folder_id: string) => {
    let folder: DocumentSnapshot<Document> | null = null;

    if (params.folder_id) {
      folder = await getOneDocument(currentUser!.email, params.folder_id);
    }

    if (folder && !folder.exists()) {
      return router.replace("/r-drive/root"); // going back to root;
    }

    if (folder?.exists()) setCurrentFolder({ ...folder.data(), id: folder.id });
    else if (folder_id === "root") setCurrentFolder("root");

    setLoadingCurrentFolder(false);

    listFolderDocuments(currentUser!.email, folder_id)
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
    console.log({ pathname });
    const reloadData = (searchParams.get("rld") || "false") === "true"; // rld means "reload data"

    if (searchParams.get("viewing") && documents.length) {
      /**
       * meaning a file is currently opened. so we shouldn't refetch path
       */
      setLoadingDocs(false);
      setLoadingCurrentFolder(false);

      return;
    }

    setLoadingDocs(true);
    setLoadingCurrentFolder(true);

    fetchDocuments(params.folder_id || "root");

    return () => {
      // setDocuments(null);
    };
  }, [params, refetchDocs]);

  return <>{children}</>;
}
