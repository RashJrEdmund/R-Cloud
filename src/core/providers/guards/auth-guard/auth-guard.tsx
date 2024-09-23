"use client";

import { LoadingPage } from "@/features/next-primitive-pages";
import { useUserStore } from "@/providers/stores/zustand";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { currentUser } = useUserStore();

  const router = useRouter();

  if (!currentUser) {
    (async () => {
      toast("You must be logged in to access this page!");
    })().then(() => {
      router.replace("/login?next=" + window.location.toString());
    });

    return <LoadingPage />;
  }

  return <>{children}</>;
}
