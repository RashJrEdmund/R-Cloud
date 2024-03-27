/* FILE_DESC +=> =============================
| Implemented document logic for users here. |
|, i.e documents and collections.            |
================================//========= */

import { setDoc, getDoc } from 'firebase/firestore';
import { createUserDocPath } from './utils';

import type { IUserProfile } from '@/interfaces/entities';
import type { DocumentSnapshot } from 'firebase/firestore';
import type { IUpdateAction } from '../interfaces';

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

const updateUsedSpace = async (email: string, used_bytes: number, action: IUpdateAction = 'ADD') => {
  try {
    const profile_path = createUserDocPath<IUserProfile>(email, '/profile/me');

    const profile = await getDoc(profile_path);

    if (!profile.exists()) {
      throw new Error('PROFILE DOES NOT EXIST');
    };

    const _profile = profile.data();

    let new_used_bytes = 0;

    if (action === 'ADD') {
      new_used_bytes = Number(_profile.plan.used_bytes) + used_bytes;
    } else if (action === 'SUBTRACT') {
      new_used_bytes = Number(_profile.plan.used_bytes) - used_bytes;
    } else { // for replace ACTION
      new_used_bytes = used_bytes;
    }

    // console.log({ _profile, new_used_bytes });

    return setDoc(profile_path,
      {
        plan: {
          used_bytes: new_used_bytes
        }
      },
      { merge: true } // merge true so as to create if doesn't exist of only update specified fields if exits;
    );
  } catch (error) {
    throw error;
  }
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
