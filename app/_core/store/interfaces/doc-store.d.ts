import type { IDocument } from '@/interfaces/entities';

interface IDocStore {
  documents: IDocument[] | null;
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: IDocument[] | null) => void;
};

export type {
  IDocStore,
};
