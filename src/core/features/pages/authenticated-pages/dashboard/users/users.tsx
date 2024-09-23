"use client";

import { DivCard } from "@/components/atoms";
import { TopSection, UserTable } from "./components";
import { useGetUsers } from "./api/users.queries";

export default function DashboardUsersPage() {
  const { data, isLoading, isFetching } = useGetUsers();

  return (
    <DivCard className="h-auto w-full flex-col justify-start">
      <TopSection isFetching={isFetching} data={data} />

      <UserTable userProfiles={data!} isLoading={isLoading} />
    </DivCard>
  );
}
