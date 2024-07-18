"use client";

/* FILE_DESC +=> ==================================
| This is the loose auth-guard, will only attempt |
| load a currently logged in user and update the  |
| currentUser zustand state variable unlike the   |
| strict auth-guard                               |
=====================================//==========*/

import { _onAuthStateChange } from "@/core/config/firebase";
import { useEffect, useState } from "react";
import { LoadingPage } from "@/features/next-primitive-pages";
import { useUserStore, useDocStore } from "@/providers/stores/zustand";
import { useParams, useRouter } from "next/navigation";
import { getOneDocument } from "@/core/config/firebase/fire-store";

import type { User } from "@/core/interfaces/entities";

interface LooseGuardOptions {
  strict?: boolean;
}

export default function AuthGuard<T>(
  Component: (p: T) => JSX.Element,
  guardOptions?: LooseGuardOptions
) {
  return function Guard(props: Partial<T>) {
    const [loading, setLoading] = useState<{ user: boolean; doc: boolean }>({
      user: true,
      doc: false,
    }); // loading states for both document and user.
    const [current_user, set_current_user] = useState<User | null>(null);
    const { setCurrentUser } = useUserStore();
    const { setCurrentFolder } = useDocStore();

    const params = useParams<{ folder_id: string }>();
    const router = useRouter();

    useEffect(() => {
      let unsubscribe: any = () => null;

      (async () => {
        try {
          const res = await _onAuthStateChange();

          unsubscribe = res.unsubscribe;

          if (res?.user) {
            const { user } = res;
            const _user = {
              id: user.uid,
              email: user.email || "",
              username:
                user.displayName || user?.email?.split("@").shift() || "",
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

            set_current_user(_user as any);
            setCurrentUser(_user as any);
          }
        } catch (err) {
          console.warn(err);
        } finally {
          setLoading((prev) => ({ ...prev, user: false }));
        }
      })();

      return () => {
        unsubscribe();
      };
    }, []);

    useEffect(() => {
      (async () => {
        if (current_user && params?.folder_id) {
          /* DESC +=> ==============================================
          | Meaning you are in the /r-drive/root/[folder_id] route |
          ==========================================//============*/

          try {
            setLoading((prev) => ({ ...prev, doc: true }));

            const folder = await getOneDocument(
              current_user.email,
              params.folder_id
            );

            if (folder.exists()) {
              setCurrentFolder({ ...folder.data(), id: folder.id });
            } else {
              router.replace("/r-drive/root");
              return;
            }
          } finally {
            setLoading((prev) => ({ ...prev, doc: false }));
          }
        } else {
          setCurrentFolder("root");
          setLoading((prev) => ({ ...prev, doc: false }));
        } // the default;
      })();
    }, [params, current_user]);

    if (loading.user || loading.doc) return <LoadingPage />;

    if (guardOptions?.strict) {
      if (!current_user) {
        router.replace("/login");
        return null;
      }
    }

    return <Component {...(props as T)} currentUser={current_user} />;
  };
}
