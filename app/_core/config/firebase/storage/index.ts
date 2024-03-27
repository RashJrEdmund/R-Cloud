/* FILE_DESC +=> =======================
| Implemented storage logic here., i.e |
| file upload.                         |
=========================//========== */

import { ref, uploadBytes, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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

const uploadFile = async (file: File, email: string, setProgress?: ISetProgress): Promise<{ download_url: string, filename: string }> => {
  const filename = getFileName(file); // to get the extension
  const storageRef = createUserStorageRef(email, `/r-drive/${filename}`); // +=> ref(storage, `users/${email}/r-drive/${filename}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  if (setProgress) setProgress(0); // initializing progress;

  return new Promise<{ download_url: string, filename: string }>((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // console.log('progressing', progress);
        // console.log('snapshot', snapshot);

        if (setProgress) setProgress(progress);

        switch (snapshot.state) {
        case 'paused':
          // 'Upload is paused';
          break;
        case 'running':
          // 'Upload is running';
          break;
        case 'canceled':
          // 'Upload is canceled';
          break;
        case 'error':
          // 'Upload error ocurred';
          break;
        case 'success':
          // 'Upload completed';
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
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((download_url) => {
            resolve({
              download_url,
              filename, // adding filename so as to store in file document which will be used for deleting the actual file
            });
          })
          .catch((er) => {
            reject(er);
          });
      }
    );
  });
};

const deleteFile = (email: string, filename: string) => {
  const file_path = createUserStorageRef(email, `/r-drive/${filename}`);

  return deleteObject(file_path);
};

export {
  updateProfileImage,

  uploadFile,

  deleteFile,
};
