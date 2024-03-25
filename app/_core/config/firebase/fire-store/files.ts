/* FILE_DESC +=> =============================
| Implemented document logic for files here. |
|, i.e documents and collections.            |
================================//========= */

import { createUserCollectionPath, createUserDocPath } from './utils';
import {
  addDoc, setDoc, getDocs, getDoc, deleteDoc,
  query, where, getAggregateFromServer, sum
} from 'firebase/firestore';
import { getSizeFromBytes } from '@/utils/file-utils';

import type { IDocument } from '@/interfaces/entities';
import type { AggregateField, AggregateQuerySnapshot, QuerySnapshot } from 'firebase/firestore';
import { deleteFile } from '..';

// READ REQUESTS

const getOneDocument = async (email: string, doc_id: string) => {
  const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + doc_id);

  return getDoc(document_path);
};

const listFolderDocuments = async (email: string, folder_id: string): Promise<QuerySnapshot<IDocument>> => {
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

const renameDocument = async (email: string, doc_id: string, name: string) => {
  const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + doc_id);

  return setDoc(document_path,
    { name },
    { merge: true } // merge true so as to create if doesn't exist of only update specified fields if exits;
  );
};

// UPDATE REQUESTS

const updateFolderSize = async (email: string, folder_id: string, updates: { bytes: number, length: number }, action: 'ADD' | 'SUBTRACT' = 'ADD') => { // action defaults to ADDITION action. SUBTRACT is used for when deleting files;
  try {
    const document_path = createUserDocPath<IDocument>(email, '/r-drive/' + folder_id);

    const folder = await getDoc(document_path);

    if (!folder.exists()) {
      throw new Error('FOLDER DOES NOT EXIST');
    };

    const prev = folder.data();

    let new_bytes = 0;

    let new_length = 0;

    if (action === 'ADD') { // default is ADD
      new_bytes = prev.capacity.bytes + updates.bytes;
      new_length = Number(prev.capacity.length) + Number(updates.length);
    } else { // subtracting
      new_bytes = prev.capacity.bytes - updates.bytes;
      new_length = Number(prev.capacity.length) - Number(updates.length);
    }

    const _update_capacity = {
      bytes: new_bytes,
      length: new_length,
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

// DELETE REQUESTS

interface IDeleteOptions {
  update_profile?: boolean; // this is true by default
};

const deleteFiles = async (email: string, files: IDocument[], options?: IDeleteOptions) => {
  const parent_id = files[0].parent_id; // since it's files of the same directory level

  const completed = {
    bytes: 0,
    length: 0, // this is the length to subtract.
  };

  for (const file of files) {

    console.log('deleting files', file);
    const file_path = createUserDocPath<IDocument>(email, '/r-drive/' + file.id);

    await deleteFile(email, String(file.filename)) // delete file from storage
      .then(() => deleteDoc(file_path));

    completed.bytes += file.capacity.bytes;
    completed.length += 1;
  };

  // now updating parent folder's capacity

  if (options?.update_profile) {
    //
  }

  if (parent_id === 'root') return; // meaning the files were at the very top level

  return updateFolderSize(
    email,
    parent_id,
    { ...completed },
    'SUBTRACT', // very important for deletion to reflect on size;
  );
};

const deleteAllDescendants = async (email: string, ancestor_folder_id: string) => {
  //
};

const deleteFolders = async (email: string, folders: IDocument[], options?: IDeleteOptions) => {

  for (const folder of folders) {
    const folder_path = createUserDocPath<IDocument>(email, '/r-drive/' + folder.id);

    await deleteAllDescendants(email, folder.id);
    await deleteDoc(folder_path);
  };
};

const deleteDocuments = async (email: string, documents: IDocument[]) => {
  const files = documents.filter((doc) => doc.type === 'FILE');
  const folders = documents.filter((doc) => doc.type === 'FOLDER');

  if (files.length > 0) await deleteFiles(email, files); // meaning there's files selected.

  if (folders.length > 0) await deleteFolders(email, folders); // meaning there's folder's selected
};

export {
  getOneDocument,
  listFolderDocuments,
  getTotalUsedSize,

  createFileDoc,
  renameDocument,
  updateFolderSize,

  //deletion
  deleteDocuments,
  deleteFiles,
  deleteFolders,
};
