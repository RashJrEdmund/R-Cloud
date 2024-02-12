'use client';

/* FILE_DESC +=> ==================================
| This is the loose auth-guard, will only attempt |
| load a currently logged in user and update the  |
| currentUser zustand state variable unlike the   |
| strict auth-guard                               |
=====================================//==========*/

import { _onAuthStateChange } from '@/core/config/firebase';
import { useEffect, useState } from 'react';
import type { IUser } from '@/interfaces/entities';
import { Streamer } from '@/components/molecules';
import { useUserStore } from '@/store/zustand';

export default function LooseAuthGuard(Component: React.JSXElementConstructor<React.ReactNode>) {
  return function Guard(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [current_user, set_current_user] = useState<IUser | null>(null);
    const { setCurrentUser } = useUserStore();

    useEffect(() => {
      let unsubscribe: any = () => null;

      (async () => {
        try {
          const res = await _onAuthStateChange();

          unsubscribe = res.unsubscribe;

          if (res.user) {
            const { user } = res;
            const _user = {
              id: user.uid,
              email: user.email || '',
              username: user.displayName || user?.email?.split('@').shift() || '',
              date_of_birth: '',
              phone_number: user.phoneNumber || '',
              photo_url: user.photoURL || '',
              accessToken: await user.getIdToken(),
              metadata: {
                createdAt: (user.metadata as any)?.createdAt || '',
                lastLoginAt: (user.metadata as any)?.lastLoginAt || '',
                creationTime: user.metadata.creationTime || '',
                lastSignInTime: user.metadata.lastSignInTime || '',
              }
            };

            set_current_user(_user as any);
            setCurrentUser(_user as any);
          }

        } catch (err) {
          console.warn(err);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        unsubscribe();
      };
    }, []);

    if (loading) return <Streamer />;

    return <Component {...props} currentUser={current_user} />;
  };
};
