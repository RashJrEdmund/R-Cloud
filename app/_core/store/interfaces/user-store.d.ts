/* eslint-disable no-unused-vars */
import type { IUser, IUserProfile } from '@/interfaces/entities';

interface IUserStore {
  currentUser: IUser | null;
  setCurrentUser: (currentUser: IUser | null) => void;

  userProfile: IUserProfile | null;
  setUserProfile: (profile: IUserProfile) => void;
};

export type {
  IUserStore,
};
