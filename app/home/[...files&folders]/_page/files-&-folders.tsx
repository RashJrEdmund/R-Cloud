'use client';

import { MainTag } from '@/components/atoms';
import { PathWrapper } from '@/_core/ui/guards';
import type { IDocument } from '@/interfaces/entities';
import { FilesFolderDisplayPage } from '@/home/_components';

interface Props {
  content: IDocument[];
};

function FilesFoldersPage({ }: Props) {
  return (
    <MainTag>
      <FilesFolderDisplayPage />
    </MainTag>
  );
}

export default PathWrapper(FilesFoldersPage);
