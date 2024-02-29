import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { fireStore } from '..';

import type { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import type { IStoragePlan, StoragePlanIds } from '@/interfaces/entities';

const getStoragePlans = async (): Promise<QuerySnapshot<IStoragePlan>> => {
  const doc_path = collection(fireStore, 'storage-plans');

  return getDocs(doc_path) as Promise<QuerySnapshot<IStoragePlan>>;
};

const getOneStoragePlan = async (id: StoragePlanIds = '0'): Promise<DocumentSnapshot<IStoragePlan>> => {
  const doc_path = doc(fireStore, `/storage-plans/${id}`);

  return getDoc(doc_path) as Promise<DocumentSnapshot<IStoragePlan>>;
};

export {
  getStoragePlans,
  getOneStoragePlan,
};

getOneStoragePlan().then(res => {
  console.log(res, res.data());
});
