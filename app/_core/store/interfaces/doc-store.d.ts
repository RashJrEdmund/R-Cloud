import type { IDocument } from '@/interfaces/entities';

interface IDocStore {
  documents: IDocument[] | null;
  // eslint-disable-next-line no-unused-vars
  setDocuments: (documents: IDocument[]) => void;
};

export type {
  IDocStore,
};
