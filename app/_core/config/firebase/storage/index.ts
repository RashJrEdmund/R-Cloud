/* TODO +=> ===========================
| Implement storage logic here., i.e |
| file upload.                         |
===================================== */

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '..';
import { updateProfile } from 'firebase/auth';

const baseStorageRef = ref(storage, 'users');

const getHomeStorageRef = (user_id: string, path: string) => ref(baseStorageRef, `${user_id}/files/` + path);

const updateProfileImage = async (file: File, user_id: string) => {
  const storageRef = getHomeStorageRef(user_id, '/profile_url'); // +=> ref(storage, `users/${user_id}/files/profile_url`);

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
