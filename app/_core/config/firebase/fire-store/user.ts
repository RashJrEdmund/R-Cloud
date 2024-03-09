/* FILE_DESC +=> =============================
| Implemented document logic for users here. |
|, i.e documents and collections.            |
================================//========= */

import type { IUserProfile } from '@/interfaces/entities';
import type { DocumentSnapshot } from 'firebase/firestore';

import { setDoc, getDoc } from 'firebase/firestore';
import { createUserDocPath } from './utils';

// READ request

const getUserProfile = async (email: string): Promise<DocumentSnapshot<IUserProfile>> => {
  const doc_path = createUserDocPath(email || '', '/profile/me');

  return getDoc(doc_path) as Promise<DocumentSnapshot<IUserProfile>>;
};

// WRITE requests

const createUserProfile = async (user: IUserProfile) => {
  const doc_path = createUserDocPath(user.email || '', '/profile/me');

  const { ...userData } = user;
  const docRef = await setDoc(doc_path, { // addDoc doesn't allow customIds, setDoc does
    ...userData
  }, { merge: true }); // so as to update if exits or create if not exits;

  return docRef;
};

const updateUsedSpace = async (email: string, used_space: number) => {
  // const doc_path = createUserDocPath<IUserProfile>(email || '', '/profile/me');

  // // const { ...userData } = user;
  // const docRef = await setDoc(doc_path, { // addDoc doesn't allow customIds, setDoc does
  //   'plan?.used_space': used_space,
  // }, { merge: true }); // so as to update if exits or create if not exits;

  // return docRef;
};

const updateUserAccountSettings = async (email: string, settings: { [k: string]: string }) => {
  const doc_path = createUserDocPath(email, '/profile/settings');

  console.log('user document created', doc_path, settings);
};

export {
  getUserProfile,

  createUserProfile,
  updateUsedSpace,

  updateUserAccountSettings
};
