import type { SharedDocument, Document } from "@/core/interfaces/entities";
import { createFreeDocPath } from "../utils";
import { deleteDoc, setDoc } from "firebase/firestore";
import { updateDocument } from "./docs";

const removeAllSharedAccess = (email: string, doc_id: string) => {
  const doc_path = createFreeDocPath(["shared", doc_id]);

  return Promise.all([
    deleteDoc(doc_path),
    updateDocument(email, doc_id, {
      sharedSate: {
        accessType: "RESTRICTED",
        viewerRole: "VIEWER",
        sharedWith: [],
      }
    }),
  ]).then(() => "this file is no longer shared");
};

const shareDocument = async (sharedDocument: SharedDocument, fileToBeShared: Document) => {
  const doc_path = createFreeDocPath(["shared", sharedDocument.doc_id]);

  const isFirstTimeSharing = !!fileToBeShared?.sharedSate?.sharedWith.length;

  const { shared_by: email, doc_id } = sharedDocument;

  return Promise.all([
    setDoc(doc_path, sharedDocument, { merge: true }),
    updateDocument(email, doc_id, {
      sharedSate: {
        accessType: sharedDocument.accessType,
        viewerRole: sharedDocument.viewerRole,
        sharedWith: sharedDocument.sharedWith,
      }
    })
  ]).then(() => isFirstTimeSharing ? "file shared successfully" : "file share access updated");
};

export {
  shareDocument,
  removeAllSharedAccess,
};
