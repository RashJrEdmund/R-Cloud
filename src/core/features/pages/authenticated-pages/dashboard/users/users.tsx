"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { getUsers } from "./api/users.endpoints";
import { useQuery } from "@tanstack/react-query";

export default function DashboardUsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  return (
    <DivCard className="w-full h-auto bg-slate-400 flex-col justify-start">
      <TextTag>dashboard users page</TextTag>

      <pre className="max-w-default_app_max_w overflow-auto">
        {JSON.stringify(data?.docs.map(user => ({ ...user.data(), id: user.id, metadata: user.metadata })), null, 4)}
      </pre>
    </DivCard>
  );
}
