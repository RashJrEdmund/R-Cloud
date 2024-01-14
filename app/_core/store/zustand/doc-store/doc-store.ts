import { dummyData } from '@/utils/constants';
import { create } from 'zustand';
import { IDocStore } from '../../interfaces';

export const useDocStore = create<IDocStore>(set => ({
  documents: dummyData,
  setDocuments: (documents) => set({ documents })
}));
