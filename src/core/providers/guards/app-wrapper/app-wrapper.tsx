"use client";

/* FILE_DESC +=> ==================================
| This is the loose auth-guard, will only attempt |
| load a currently logged in user and update the  |
| currentUser zustand state variable unlike the   |
| strict auth-guard                               |
=====================================//==========*/

import { _onAuthStateChange } from "@/core/config/firebase";
import { useEffect } from "react";
import { LoadingPage } from "@/features/next-primitive-pages";
import { useUserStore } from "@/providers/stores/zustand";
import type { User } from "@/core/interfaces/entities";

interface Props {
  children: React.ReactNode;
};

export default function AppWrapper({ children }: Props) {
  const {
    setCurrentUser,

    currentUserLoading,
    setCurrentUserLoading,
  } = useUserStore();

  useEffect(() => {
    let unsubscribe: any = () => null;

    (async () => {
      setCurrentUserLoading(true);

      try {
        const res = await _onAuthStateChange();

        unsubscribe = res.unsubscribe;

        if (res?.user) {
          const { user } = res;
          const _user = {
            id: user.uid,
            email: user.email || "",
            username: user.displayName || user?.email?.split("@").shift() || "",
            date_of_birth: "",
            phone_number: user.phoneNumber || "",
            photo_url: user.photoURL || "",
            accessToken: await user.getIdToken(),
            metadata: {
              createdAt: (user.metadata as any)?.createdAt || "",
              lastLoginAt: (user.metadata as any)?.lastLoginAt || "",
              creationTime: user.metadata.creationTime || "",
              lastSignInTime: user.metadata.lastSignInTime || "",
            },
          };

          setCurrentUser(_user as User);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setCurrentUserLoading(false);
      }
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  if (currentUserLoading) return <LoadingPage />;

  return <>{children}</>;
};
