import type { IUser } from '@/interfaces/entities';

interface IUserStore {
  currentUser: IUser | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (currentUser: IUser | null) => void;
};

export type {
  IUserStore,
};
