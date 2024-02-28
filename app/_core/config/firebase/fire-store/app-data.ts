import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '..';

import type { QuerySnapshot } from 'firebase/firestore';
import type { IStoragePlan } from '@/interfaces/entities';

const getStoragePlans = async (): Promise<QuerySnapshot<IStoragePlan>> => {
  const doc_path = collection(fireStore, 'storage-plans');

  return getDocs(doc_path) as Promise<QuerySnapshot<IStoragePlan>>;
};

export {
  getStoragePlans,
};
