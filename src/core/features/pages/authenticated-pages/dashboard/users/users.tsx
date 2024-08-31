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

      <TextTag>
        total: {data?.docs.length}
      </TextTag>

      <table className="overflow-auto border">
        <tr className="w-full">
          <th>Email</th>
          <th>Plan</th>
          <th>Role</th>
          <th>Used Bytes</th>
        </tr>

        {
          data?.docs.map((user) => (
            <tr key={user.id} className="w-full">
              <td>{user.data().email}</td>
              <td>{user.data().plan.label}</td>
              <td>{user.data().role}</td>
              <td>{user.data().plan.used_bytes}</td>
            </tr>
          ))
        }
      </table>

      {/* <pre className="max-w-default_app_max_w overflow-auto">
        {JSON.stringify(data?.docs.map(user => ({ ...user.data(), id: user.id, metadata: user.metadata })), null, 4)}
      </pre> */}
    </DivCard>
  );
}
