import type { IDocument } from '@/interfaces/entities';

interface IDocStore {
  documents: IDocument[] | null;
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: IDocument[] | null) => void;

  currentFolder: IDocument | 'root';
  // eslint-disable-next-line no-unused-vars
  setCurrentFolder: (documents: IDocument | 'root') => void;

  refetchPath: boolean;
  toggleRefetchPath: () => void;
};

export type {
  IDocStore,
};
