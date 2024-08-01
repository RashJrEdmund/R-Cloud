import type { User } from "@/core/interfaces/entities";

import type { User as FirebaseUser } from "firebase/auth";

const extractUserDetailsFromFirebaseAuth = async (user: FirebaseUser) => {
  const _user = {
    id: user.uid,
    email: user.email || "",
    username: user.displayName || user?.email?.split("@").shift() || "",
    date_of_birth: "",
    phone_number: user.phoneNumber || "",
    photo_url: user.photoURL || "",
    accessToken: await user.getIdToken(),
    metadata: {
      createdAt: (user.metadata as any)?.createdAt || "",
      lastLoginAt: (user.metadata as any)?.lastLoginAt || "",
      creationTime: user.metadata.creationTime || "",
      lastSignInTime: user.metadata.lastSignInTime || "",
    },
  } as User;

  return _user;
};

export { extractUserDetailsFromFirebaseAuth };
