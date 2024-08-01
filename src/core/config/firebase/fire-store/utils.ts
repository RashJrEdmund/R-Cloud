/* FILE_DESC +=> ===========================
| Implemented fire-store utility functions |
| here.                                    |
================================//======= */

import { collection, doc } from "firebase/firestore";
import { fireStore } from "..";

import type {
  DocumentData,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";

const createUserCollectionPath = <T = DocumentData>(
  email: string,
  _path: string
) => {
  return collection(
    fireStore,
    `users/${email}` + _path
  ) as CollectionReference<T>;
};

const createUserDocPath = <T = DocumentData>(email: string, _path: string) => {
  return doc(fireStore, `users/${email}` + _path) as DocumentReference<T>;
};

export { createUserCollectionPath, createUserDocPath };
