/* FILE_DESC +=> =============================
| Implemented document logic for files here. |
|, i.e documents and collections.            |
================================//========= */

import type { IDocument, DocumentType, IStorageUnit } from '@/interfaces/entities';
import { createUserDocPath } from './utils';
import { addDoc } from 'firebase/firestore';

const createFileDoc = async (email: string, document: IDocument) => {
  const docPath = createUserDocPath(email, '/home');

  const docRef = await addDoc(docPath, document);

  return docRef;
};

export {
  createFileDoc,
};
