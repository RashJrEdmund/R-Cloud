"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* FILE_DESC +=> ====================================
| Meant to read current dynamic route and fetch data |
| for the parent folder                              |
========================================//==========*/

import { useState, useEffect, useCallback } from "react";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";

import { useParams, useRouter } from "next/navigation";
import { LoadingPage } from "@/features/next-primitive-pages";

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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams<{ folder_id: string }>();

  const { currentUser } = useUserStore();
  const { setDocuments, refetchPath, setCurrentFolder } = useDocStore();

  // const content: Document[] = [];

  const fetchDocuments = useCallback(async (folder_id: string) => {
    let folder: DocumentSnapshot<Document> | null = null;

    if (params.folder_id) {
      folder = await getOneDocument(currentUser?.email || "", params.folder_id);
    }

    if (folder && !folder.exists()) {
      return router.replace("/r-drive/root"); // going back to root;
    }

    if (folder?.exists()) setCurrentFolder({ ...folder.data(), id: folder.id });

    listFolderDocuments(currentUser?.email || "", folder_id).then((res) => {
      if (res.empty) {
        setDocuments([]);
        return;
      }

      const data: Document[] = [];

      res.forEach((doc) => {
        const _: Document = {
          ...doc.data(),
          id: doc.id,
          metadata: doc.metadata,
        } as Document;
        data.push(_);
      });

      // console.clear();
      // console.log(data);

      setDocuments(data);
    });
  }, []);

  useEffect(() => {
    fetchDocuments(params.folder_id || "root").finally(() => {
      setLoading(false);
    });

    // fetch default r-drive/root data. i.e data from supposed root director
    return () => {
      setDocuments(null);
    };
  }, [params, refetchPath]);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}
