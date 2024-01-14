import type { IUser } from '@/interfaces/entities';

interface IUserStore {
  currentUser: IUser | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (currentUser: IUser) => void;
};

export type {
  IUserStore,
};
