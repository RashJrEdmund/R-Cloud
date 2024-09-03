"use client";

/* FILE_DESC +=> ==================================
| This is the loose auth-guard, will only attempt |
| load a currently logged in user and update the  |
| currentUser zustand state variable unlike the   |
| strict auth-guard                               |
=====================================//==========*/

import { LoadingPage } from "@/features/next-primitive-pages";
import { useUserStore } from "@/providers/stores/zustand";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { currentUser, currentUserLoading } = useUserStore();

  const router = useRouter();

  if (currentUserLoading) return <LoadingPage />;

  if (!currentUser) {
    router.replace("/login?next=" + window.location);

    return <LoadingPage />;
  }

  return <>{children}</>;
}
