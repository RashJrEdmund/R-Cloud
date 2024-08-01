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
import { extractUserDetailsFromFirebaseAuth } from "./app-wrapper.service";

interface Props {
  children: React.ReactNode;
}

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
          const _user = await extractUserDetailsFromFirebaseAuth(user);

          setCurrentUser(_user);
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
}
