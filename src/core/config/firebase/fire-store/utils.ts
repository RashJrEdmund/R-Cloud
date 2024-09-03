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

/**
 * Must be an odd path
 */
const createFreeCollectionPath = <T = DocumentData>(
  path: string | string[]
) => {
  const _path = Array.isArray(path) ? path.join("/") : path;

  return collection(fireStore, _path) as CollectionReference<T>;
};

/**
 * Must be an even path
 */
const createFreeDocPath = <T = DocumentData>(path: string | string[]) => {
  const _path = Array.isArray(path) ? path.join("/") : path;

  return doc(fireStore, _path) as DocumentReference<T>;
};

/**
 * Ends up as an odd path.
 * Built on top of createFreeCollectionPath
 */
const createUserCollectionPath = <T = DocumentData>(
  email: string,
  _path: string
) => {
  return createFreeCollectionPath<T>(`users/${email}` + _path);
};

/**
 * Ends up as an even path.
 * Built on top of createFreeDocPath
 */
const createUserDocPath = <T = DocumentData>(email: string, _path: string) => {
  return createFreeDocPath<T>(`users/${email}` + _path);
};

export {
  createFreeCollectionPath,
  createFreeDocPath,
  createUserCollectionPath,
  createUserDocPath,
};
