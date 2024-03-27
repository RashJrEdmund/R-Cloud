/* TODO +=> ===========================
| Implement user authentication logic, |
| and include google providers.        |
===================================== */

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,

  signInWithPopup,

  signOut,
} from 'firebase/auth';
import type { Unsubscribe, User, } from 'firebase/auth';
import { auth, googleProvider } from '..';
import { IUser } from '@/interfaces/entities';

const loginWithEmailAndPass = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log({ errorCode, errorMessage, email, password });
    throw (error as { code: string, message: string });
  };
};

const signUpWithCredentials = async (email: string, password: string, other_credentials: Partial<IUser>) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res) {
      await updateProfile(res.user, {
        displayName: other_credentials.username,
      });
    }

    return res.user;
  } catch (error) {
    //
  };
};

const signInOrUpWithGooglePopup = async () => {
  return signInWithPopup(auth, googleProvider).then((res) => {
    return res; // res is an object with { user, providerId, operationType, _tokenResponse }
  }).catch((error) => {
    console.warn('error');
  });
};

const _onAuthStateChange = async () => {
  return new Promise<{ user: User | null, unsubscribe: Unsubscribe }>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve({ user, unsubscribe });
    });
  });
};

const logOut = async () => signOut(auth);

export {
  loginWithEmailAndPass,
  signUpWithCredentials,
  _onAuthStateChange,

  signInOrUpWithGooglePopup,

  logOut,
};
