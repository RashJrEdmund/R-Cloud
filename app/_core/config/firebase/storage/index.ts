/* TODO +=> ===========================
| Implement storage logic here., i.e |
| file upload.                         |
===================================== */

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '..';
import { updateProfile } from 'firebase/auth';

const baseStorageRef = ref(storage, 'users');

interface userPathCred {
  email: string;
  user_id: string;
};

const getHomeStorageRef = (userPathCred: userPathCred, path: string) => ref(baseStorageRef, `${userPathCred.user_id + '-' + userPathCred.email}/files/` + path);

const updateProfileImage = async (file: File, userPathCred: userPathCred) => {
  const storageRef = getHomeStorageRef(userPathCred, '/profile_url'); // +=> ref(storage, `users/${user_id}-{email}/files/profile_url`);

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

export {
  updateProfileImage,
};
