/* FILE_DESC +=> ========================
| Implemented document logic here., i.e |
| documents and collections.            |
=============================//======= */

import type { IDocument, DocumentType, IUser } from '@/interfaces/entities';
import { addDoc, collection } from 'firebase/firestore';
import { fireStore } from '..';

const createUserDocPath = (email: string, _path: string) => collection(fireStore, `users/${email}` + _path);

const createUserProfile = async (user: IUser) => {
  const path = createUserDocPath(user.email, '/profile');

  const { accessToken: _, metadata: __, ...userData } = user;
  const docRef = await addDoc(path, {
    ...userData
  });

  return docRef;
};

const createFileDoc = async (email: string) => {
  const path = createUserDocPath(email, '/home');

  const docRef = await addDoc(path, {});

  return docRef;
};

export {
  createUserProfile,
  createFileDoc,
};
