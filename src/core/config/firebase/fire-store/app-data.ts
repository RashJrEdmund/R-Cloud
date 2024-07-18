import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { fireStore } from "..";

import type { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import type { StoragePlan, StoragePlanIds } from "@/core/interfaces/entities";

const getStoragePlans = async (): Promise<QuerySnapshot<StoragePlan>> => {
  const collection_path = collection(fireStore, "storage-plans");

  return getDocs(collection_path) as Promise<QuerySnapshot<StoragePlan>>;
};

const getOneStoragePlan = async (
  id: StoragePlanIds = "0"
): Promise<DocumentSnapshot<StoragePlan>> => {
  const doc_path = doc(fireStore, `/storage-plans/${id}`);

  return getDoc(doc_path) as Promise<DocumentSnapshot<StoragePlan>>;
};

export { getStoragePlans, getOneStoragePlan };
