/* TODO +=> ===========================
| Implement user authentication logic, |
| and include google providers.        |
===================================== */

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.';

export const loginWithEmailAndPass = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);

  console.log(res.user);
};
