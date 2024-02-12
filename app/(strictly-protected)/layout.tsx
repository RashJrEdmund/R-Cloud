'use client';

/* FILE_DESC +=> ======================
| Layout for strictly protected routes |
==========================//==========*/

import { StrictAuthGuard } from '@/guards/index';

interface Props {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <StrictAuthGuard>
      {children}
    </StrictAuthGuard>
  );
};
