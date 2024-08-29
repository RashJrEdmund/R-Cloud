/* eslint-disable no-unused-vars */
import type { User, UserProfile } from "@/core/interfaces/entities";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;

  refetchCurrentUser: boolean;
  toggleRefetchCurrentUser: () => void;

  currentUserLoading: boolean;
  setCurrentUserLoading: (state: boolean) => void;

  /**
   * Use Profile
   */
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;

  refetchUserProfile: boolean;
  toggleRefetchUserProfile: () => void;

  userProfileLoading: boolean;
  setUserProfileLoading: (state: boolean) => void;

  logOutDialogOpen: boolean;
  setLogOutDialogOpen: (state: boolean) => void;
}

export type { UserStore };
