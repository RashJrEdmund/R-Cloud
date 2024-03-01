/* FILE_DESC +=> =============================
| Implemented document logic for files here. |
|, i.e documents and collections.            |
================================//========= */

import type { IDocument, DocumentType, IStorageUnit } from '@/interfaces/entities';
import { createUserCollectionPath } from './utils';
import { addDoc } from 'firebase/firestore';

const createFileDoc = async (email: string, document: IDocument) => {
  const collection_path = createUserCollectionPath(email, '/home');

  const docRef = await addDoc(collection_path, document);

  return docRef;
};

export {
  createFileDoc,
};
