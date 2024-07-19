'use client';

/* FILE_DESC +=> ======================
| Layout for strictly protected routes |
==========================//==========*/

import { AuthGuard } from '@/guards/index';

interface Props {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard(Layout, { strict: true }); // to ensure that the current user is gotten
