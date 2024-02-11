'use client';

import { _onAuthStateChange } from '@/core/config/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { IUser } from '@/interfaces/entities';
import { Streamer } from '@/components/molecules';

export default function AuthGuard(Component: React.JSXElementConstructor<React.ReactNode>) {
  return function Guard(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const router = useRouter();

    useEffect(() => {
      (async () => {
        try {
          const currentUser = await _onAuthStateChange();
          if (currentUser) {
            console.log({ currentUser });
          }

        } catch (err) {
          console.warn(err);
        } finally {
          setLoading(false);
        }
      })();
    }, []);

    if (loading) return <Streamer />;

    // console.log({ auth_currentuser: currentUser });
    // if (!currentUser) throw redirect('/login');

    return <Component {...props} currentUser={currentUser} />;
  };
};
