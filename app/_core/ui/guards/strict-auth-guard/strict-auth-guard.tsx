'use client';

/* FILE_DESC +=> ==============================
| This is the strict auth-guard, making sure  |
| there must be a currently logged in user    |
| before rendering any children               |
=================================//==========*/

import { LooseAuthGuard } from '..';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  currentUser: any;
};

export default LooseAuthGuard(
  function StrictAuthGuard({ children, currentUser }: Props) {

    const router = useRouter();

    if (!currentUser) {
      router.replace('/login');
      return;
    }

    return (
      <>
        {children}
      </>
    );
  } as () => JSX.Element // it actually is of type () => JSX.Element | undefined;
);

/*
function RootLayoutWrapper({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
};

export default LooseAuthGuard(RootLayoutWrapper);
*/
