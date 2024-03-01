/* FILE_DESC +=> ===========================
| Implemented fire-store utility functions |
| here.                                    |
================================//======= */

import { collection, doc } from 'firebase/firestore';
import { fireStore } from '..';

const createUserCollectionPath = (email: string, _path: string) => collection(fireStore, `users/${email}` + _path);

const createUserDocPath = (email: string, _path: string) => doc(fireStore, `users/${email}` + _path);

export {
  createUserCollectionPath,
  createUserDocPath,
};
