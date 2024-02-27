import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '..';

const getStoragePlans = async () => {
  const collectionRef = collection(fireStore, 'storage-plans');

  return getDocs(collectionRef)
    .then((snapshot) => snapshot);
};

export {
  getStoragePlans,
};
