/* FILE_DESC +=> =============================
| Implemented document logic for users here. |
|, i.e documents and collections.            |
================================//========= */

import type { IUserProfile } from '@/interfaces/entities';
import { addDoc } from 'firebase/firestore';
import { createUserDocPath } from './utils';

const createUserProfile = async (user: IUserProfile) => {
  const doc_path = createUserDocPath(user.email || '', '/profile/me');

  const { ...userData } = user;
  const docRef = await addDoc(doc_path, {
    ...userData
  });

  console.log('user document created', docRef);

  return docRef;
};

export {
  createUserProfile
};
