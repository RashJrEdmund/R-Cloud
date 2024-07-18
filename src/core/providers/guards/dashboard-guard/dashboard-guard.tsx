"use client";

/* FILE_DESC +=> ==============================
| This is the dashboard guard, making sure    |
| that only users with role ADMIN can access  |
| the dashboard, It is similar to             |
| strict-auth-guard.tsx                       |
=================================//==========*/

import type { User, UserRoles } from "@/core/interfaces/entities";
import { AuthGuard } from "..";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/core/config/firebase/fire-store";

interface Props {
  children: React.ReactNode;
  currentUser: User;
  allowedRoles?: UserRoles[];
}

export default AuthGuard<Props>(
  function DashboardGuard({ children, currentUser, allowedRoles }: Props) {
    const router = useRouter();

    const { data: userProfile, isLoading } = useQuery({
      queryKey: ["user-profile", currentUser.id],
      queryFn: () => getUserProfile(currentUser.email),
    });

    console.log({ userProfile });

    // getUserProfile(currentUser.email)
    //   .then(res => {
    //     if (!res.exists()) return;

    //     const profile = res.data();
    //     setUserProfile(profile);
    //   })
    //   .catch(() => router.push('/r-drive'))
    //   .finally(() => setLoading(false));

    return <>{children}</>;
  } as () => JSX.Element, // it actually is of type () => JSX.Element | undefined;
  {
    strict: true, // to ensure that the current user is gotten
  }
);
