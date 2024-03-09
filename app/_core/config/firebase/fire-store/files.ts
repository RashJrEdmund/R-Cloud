/* FILE_DESC +=> =============================
| Implemented document logic for files here. |
|, i.e documents and collections.            |
================================//========= */

import { createUserCollectionPath, createUserDocPath } from './utils';
import { addDoc, setDoc, getDocs, query, where, getAggregateFromServer, sum, getDoc } from 'firebase/firestore';
import { getSizeFromBytes } from '@/utils/file-utils';

import type { IDocument } from '@/interfaces/entities';
import type { AggregateField, AggregateQuerySnapshot, QuerySnapshot } from 'firebase/firestore';

// READ REQUESTS

const getOneDocument = async (email: string, doc_id: string) => {
  const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + doc_id);

  return getDoc(document_path);
};

const listFolderFiles = async (email: string, folder_id: string): Promise<QuerySnapshot<IDocument>> => {
  const collection_path = createUserCollectionPath(email, '/r-drive');

  const fileQuery = query(
    collection_path,
    where('parent_id', '==', folder_id),
  );

  return getDocs(fileQuery) as Promise<QuerySnapshot<IDocument>>;
};

const getTotalUsedSize = async (email: string): Promise<AggregateQuerySnapshot<{
  total_bytes: AggregateField<number>;
}>> => {
  const collection_path = createUserCollectionPath<IDocument>(email, '/r-drive');

  const q = query(
    collection_path,
    where('type', '==', 'FILE'),
  );

  const snapShot = (await getAggregateFromServer(q, {
    total_bytes: sum('capacity.bytes'),
  })) as AggregateQuerySnapshot<{
    total_bytes: AggregateField<number>;
  }>;

  return snapShot;
};

// CREATE REQUESTS

const createFileDoc = async (email: string, document: IDocument) => {
  const collection_path = createUserCollectionPath(email, '/r-drive'); // +=> collection(fireStore, `users/${email}/r-drive`);

  const docRef = await addDoc(collection_path, document);

  return docRef;
};

const updateFileDoc = async (email: string, doc_id: string, document: Partial<IDocument>) => {
  const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + doc_id);

  return setDoc(document_path,
    { ...document },
    { merge: true } // merge true so as to create if doesn't exist of only update specified fields if exits;
  );
};

// UPDATE REQUESTS

const updateFolderSize = async (email: string, folder_id: string, updates: { bytes: number, length: number }) => {
  try {
    const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + folder_id);

    const folder = await getDoc(document_path);

    if (!folder.exists()) {
      throw new Error('FOLDER DOES NOT EXIST');
    }

    const prev = folder.data();

    const new_bytes = prev.capacity.bytes + updates.bytes;

    const _update_capacity = {
      bytes: new_bytes,
      length: Number(prev.capacity.length) + Number(updates.length),
      size: getSizeFromBytes(new_bytes, 1).merged,
    };

    return setDoc(document_path,
      { capacity: _update_capacity }, // document here looks like { capacity: {...}} bcs of the type Pick<IDocument, 'capacity'>
      { merge: true } // merge true so as to create if doesn't exist of only update specified fields if exits;
    );
  } catch (error) {
    throw error;
  }
};

export {
  getOneDocument,
  listFolderFiles,
  getTotalUsedSize,

  createFileDoc,
  updateFileDoc,
  updateFolderSize,
};
