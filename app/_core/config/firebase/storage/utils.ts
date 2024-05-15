import { ref } from 'firebase/storage';
import { storage } from '..';

const baseStorageRef = ref(storage, 'users');

const createUserStorageRef = (email: string, path: string) => ref(baseStorageRef, `${email}` + path); // +=> ref(storage, `users/${email}/{path}`);

export {
  createUserStorageRef,
};
