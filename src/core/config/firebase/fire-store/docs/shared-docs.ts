import type { SharedDocument, Document } from "@/core/interfaces/entities";
import { createFreeCollectionPath, createFreeDocPath } from "../utils";
import {
  deleteDoc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { updateDocument } from "./docs";

const removeAllSharedAccess = (email: string, doc_id: string) => {
  const doc_path = createFreeDocPath(["shared", doc_id]);

  return Promise.all([
    deleteDoc(doc_path),
    updateDocument(email, doc_id, {
      sharedState: {
        isShared: false,
        accessType: "RESTRICTED",
        viewerRole: "VIEWER",
        sharedWith: [],
        lastModified: new Date().toISOString(),
      } as unknown as Document["sharedState"], // don't wanna add the firstSharedAt field
    }),
  ]).then(() => "this file is no longer shared");
};

const shareDocument = async (
  sharedDocument: SharedDocument,
  fileToBeShared: Document
) => {
  const doc_path = createFreeDocPath(["shared", sharedDocument.doc_id]);

  const isFirstTimeSharing = !!fileToBeShared?.sharedState?.sharedWith.length;

  const { shared_by: email, doc_id } = sharedDocument;

  return Promise.all([
    setDoc(doc_path, sharedDocument, { merge: true }),
    updateDocument(email, doc_id, {
      sharedState: {
        isShared: true,
        accessType: sharedDocument.accessType,
        viewerRole: sharedDocument.viewerRole,
        sharedWith: sharedDocument.sharedWith,
        firstSharedAt: sharedDocument.firstSharedAt,
        lastModified: sharedDocument.lastModified,
      },
    }),
  ]).then(() =>
    isFirstTimeSharing
      ? "file shared successfully"
      : "file share access updated"
  );
};

const loadUserSharedFiles = (email: string) => {
  const collection_path = createFreeCollectionPath<SharedDocument>("shared");
  const q = query(
    collection_path,
    where("sharedWith", "array-contains", email)
  );

  return getDocs(q);
};

const getOnePublicDocument = (doc_id: string) => {
  const doc_path = createFreeDocPath<SharedDocument>(["shared", doc_id]);
  return getDoc(doc_path);
};

export {
  shareDocument,
  removeAllSharedAccess,
  loadUserSharedFiles,
  getOnePublicDocument,
};
