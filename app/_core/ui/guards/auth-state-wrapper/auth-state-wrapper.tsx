'use client';

import { useUserStore } from '@/store/zustand';
import { AuthGuard } from '..';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  currentUser: any;
};

export default AuthGuard(
  function AuthStateWrapper({ children, currentUser }: Props) {
    const { setCurrentUser } = useUserStore();

    useEffect(() => {
      setCurrentUser(currentUser);
    }, []);

    return (
      <>
        {children}
      </>
    );
  } as any
);

/*
function RootLayoutWrapper({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard(RootLayoutWrapper as any);
*/
