/* TODO +=> ===========================
| Implement user authentication logic, |
| and include google providers.        |
===================================== */

import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.';

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

// export const signUpWithCredentials = async (email: string, password: string) => {
//   try {
//     const res = await cr

//     console.log(res);

//     return res.user;
//   } catch (error) {
//     //
//   };
// };

export const _onAuthStateChange = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};
