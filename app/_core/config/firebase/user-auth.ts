/* TODO +=> ===========================
| Implement user authentication logic, |
| and include google providers.        |
===================================== */

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '.';
import { IUser } from '@/interfaces/entities';

export const loginWithEmailAndPass = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    console.log(res);

    return res.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage, email, password });
    throw (error as { code: string, message: string });
  };
};

export const signUpWithCredentials = async (email: string, password: string, update: Partial<IUser>) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res) {
      await updateProfile(res.user, {
        displayName: update.username,
        date_of_birth: update.date_of_birth,
      } as any);
    }

    console.log(res);

    return res.user;
  } catch (error) {
    //
  };
};

export const _onAuthStateChange = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};
