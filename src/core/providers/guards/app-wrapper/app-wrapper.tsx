"use client";

import { _onAuthStateChange } from "@/core/config/firebase";
import { LoadingPage } from "@/features/next-primitive-pages";
import { useGetCurrentUser } from "@/features/pages/auth/api/auth.queries";

interface Props {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: Props) {
  const { isFetching } = useGetCurrentUser();

  if (isFetching) return <LoadingPage />;

  return <>{children}</>;
}
