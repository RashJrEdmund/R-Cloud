/* FILE_DESC +=> =======================
| Implemented storage logic here., i.e |
| file upload.                         |
=========================//========== */

import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '..';
import { updateProfile } from 'firebase/auth';
import { getFileName } from '@/utils/file-utils';

const baseStorageRef = ref(storage, 'users');

const createUserStorageRef = (email: string, path: string) => ref(baseStorageRef, `${email}` + path); // +=> ref(storage, `users/${email}/{path}`);

const updateProfileImage = async (file: File, email: string) => {
  const storageRef = createUserStorageRef(email, '/assets/profile_url'); // +=> ref(storage, `users/${email}/assets/profile_url`);

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

type ISetProgress = (progress: number) => void;

const uploadFile = async (file: File, email: string, setProgress?: ISetProgress) => {
  const filename = getFileName(file); // to get the extension
  const storageRef = createUserStorageRef(email, `/home/${filename}`); // +=> ref(storage, `users/${email}/home/${filename}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (setProgress) setProgress(progress);

      switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      case 'canceled':
        console.log('Upload is canceled');
        break;
      case 'error':
        console.log('Upload error ocurred');
        break;
      case 'success':
        console.log('Upload completed');
        break;
      default:
        break;
      }
    },
    (error) => {
      switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          // create document
        });

    }
  );
};

export {
  updateProfileImage,

  uploadFile,
};
