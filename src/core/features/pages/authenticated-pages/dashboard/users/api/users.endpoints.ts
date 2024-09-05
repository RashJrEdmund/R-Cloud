import type { UserProfile } from "@/core/interfaces/entities";

import { createFreeCollectionPath } from "@/core/config/firebase/fire-store/utils";
import { getDocs } from "firebase/firestore";

const getUsers = async () => {
  const usersCollection = createFreeCollectionPath<UserProfile>("/users");

  // only doing this so I can be able to update the firebase cache for this query.
  // just userCollection.docs is a complex object to mutate in the useMutation optimistic update.
  return (await getDocs(usersCollection)).docs.map((user) => ({ ...user.data(), id: user.id }));
};

export { getUsers };
