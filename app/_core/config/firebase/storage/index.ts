/* TODO +=> ===========================
| Implement storage logic here., i.e   |
| file upload.                         |
===================================== */

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '..';
import { updateProfile } from 'firebase/auth';

const baseStorageRef = ref(storage, 'users');

const createUserStorageRef = (email: string, path: string) => ref(baseStorageRef, `${email}` + path); // +=> ref(storage, `users/${email}/{path}`);

const updateProfileImage = async (file: File, email: string) => {
  const storageRef = createUserStorageRef(email, '/assets/'); // +=> ref(storage, `users/${email}/assets/`);

  return uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref); // snapshot.ref is same as storageRef above

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: url,
        });
      }

      return url;
    });
};

const uploadFile = async (file: File, email: string) => {
  const storageRef = createUserStorageRef(email, '/home/'); // +=> ref(storage, `users/${email}/home/`);

  return uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref); // snapshot.ref is same as storageRef above

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: url,
        });
      }

      return url;
    });
};

const uploadFiles = async (file: File[], email: string) => {
  const storageRef = createUserStorageRef(email, '/home/');

  // return uploadBytes(storageRef, file)
  //   .then(async (snapshot) => {
  //     const url = await getDownloadURL(snapshot.ref); // snapshot.ref is same as storageRef above

  //     if (auth.currentUser) {
  //       await updateProfile(auth.currentUser, {
  //         photoURL: url,
  //       });
  //     }

  //     return url;
  //   });
};

export {
  updateProfileImage,

  uploadFile,
  uploadFiles
};
