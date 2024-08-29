"use client";

/* FILE_DESC +=> ==============================
| This is the dashboard guard, making sure    |
| that only users with role ADMIN can access  |
| the dashboard, It is similar to             |
| strict-auth-guard.tsx                       |
=================================//==========*/

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/core/config/firebase/fire-store";
import { useUserStore } from "@/providers/stores/zustand";
import { LoadingPage } from "@/features/next-primitive-pages";

interface Props {
  children: React.ReactNode;
}

export default function DashboardGuard({ children }: Props) {
  const router = useRouter();
  const { currentUser, setUserProfile } = useUserStore();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["user-profile", currentUser!.id],
    queryFn: () => getUserProfile(currentUser!.email).then((user) => {
      setUserProfile(user.exists() ? user.data() : null);
      return user;
    }),
  });

  if (isLoading) return <LoadingPage />;

  if (!userProfile?.exists()) {
    router.replace("/login?next=" + window.location.toString());

    return <LoadingPage />;
  }

  if (!["ADMIN", "SUPER_ADMIN"].includes(userProfile.data().role)) {
    router.replace("/r-drive");
    return <LoadingPage />;
  }

  return <>{children}</>;
}
