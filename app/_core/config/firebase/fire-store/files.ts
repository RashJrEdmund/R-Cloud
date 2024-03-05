/* FILE_DESC +=> =============================
| Implemented document logic for files here. |
|, i.e documents and collections.            |
================================//========= */

import { createUserCollectionPath, createUserDocPath } from './utils';
import { addDoc, setDoc, getDocs, query, where } from 'firebase/firestore';

import type { IDocument, DocumentType, IStorageUnit } from '@/interfaces/entities';
import type { QuerySnapshot } from 'firebase/firestore';

const createFileDoc = async (email: string, document: IDocument) => {
  const collection_path = createUserCollectionPath(email, '/r-drive'); // +=> collection(fireStore, `users/${email}/r-drive`);

  const docRef = await addDoc(collection_path, document);

  return docRef;
};

const listFolderFiles = async (email: string, folder_id: string): Promise<QuerySnapshot<IDocument>> => {
  const collection_path = createUserCollectionPath(email, '/r-drive');

  const fileQuery = query(
    collection_path,
    where('parent_id', '==', folder_id),
  );

  return getDocs(fileQuery) as Promise<QuerySnapshot<IDocument>>;
};

export {
  createFileDoc,
  listFolderFiles,
};
