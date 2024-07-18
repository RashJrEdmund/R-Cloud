/* eslint-disable no-unused-vars */
import type { User, UserProfile } from "@/core/interfaces/entities";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;

  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
}

export type { UserStore };
