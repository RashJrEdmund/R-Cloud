/* FILE_DESC +=> ===========================
| Implemented fire-store utility functions |
| here.                                    |
================================//======= */

import { collection } from 'firebase/firestore';
import { fireStore } from '..';

const createUserDocPath = (email: string, _path: string) => collection(fireStore, `users/${email}` + _path);

export {
  createUserDocPath,
};
