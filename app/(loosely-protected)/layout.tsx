'use client';

/* FILE_DESC +=> =====================
| Layout for loosely protected routes |
==========================//=========*/

import { LooseAuthGuard } from '@/guards/index';
import { IUser } from '@/interfaces/entities';

interface Props {
  currentUser: IUser | null; // from loose-auth-guard;
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
};

export default LooseAuthGuard(Layout);
