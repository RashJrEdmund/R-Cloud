'use client';

import { MainTag } from '@/components/atoms';
import { PathWrapper } from '@/_core/ui/guards';
import { FilesFolderDisplayPage } from '../_components';
import type { IDocument } from '@/interfaces/entities';

interface Props {
  content: IDocument[];
};

function HomePage({ }: Props) {
  return (
    <MainTag>
      <FilesFolderDisplayPage />
    </MainTag>
  );
}

export default PathWrapper(HomePage);
