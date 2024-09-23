"use client";

import { useRouter } from "next/navigation";
import { LoadingPage } from "@/features/next-primitive-pages";
import { useGetCurrentUserProfile } from "@/features/pages/auth/api/auth.queries";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function DashboardGuard({ children }: Props) {
  const router = useRouter();
  const { data: userProfile, isLoading } = useGetCurrentUserProfile();

  if (isLoading) return <LoadingPage />;

  if (!userProfile) {
    (async () => {
      toast("You must be logged in to access this page!");
    })().then(() => {
      router.replace("/login?next=" + window.location.toString());
    });

    return <LoadingPage />;
  }

  if (!["ADMIN", "SUPER_ADMIN"].includes(userProfile.role)) {
    (async () => {
      toast("Un authorized user!", {
        description: "You do not have the rights/privileges of accessing this page"
      });
    })().then(() => {
      router.replace("/r-drive");
    });

    return <LoadingPage />;
  }

  return <>{children}</>;
}
