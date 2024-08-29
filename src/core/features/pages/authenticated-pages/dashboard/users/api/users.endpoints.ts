import type { User } from "@/core/interfaces/entities";

import { createFreeCollectionPath } from "@/core/config/firebase/fire-store/utils";
import { getDocs } from "firebase/firestore";

const getUsers = async () => {
  const usersCollection = createFreeCollectionPath<User>("/users");

  return getDocs(usersCollection);
};

export {
  getUsers,
};
