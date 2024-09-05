"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { getUsers } from "./api/users.endpoints";
import { useQuery } from "@tanstack/react-query";
import { UserTable } from "./components";
import { LoaderCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardUsersPage() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <DivCard className="h-auto w-full flex-col justify-start">
      {/* <TextTag>dashboard users page</TextTag> */}

      <DivCard className="w-full justify-start gap-12 border p-4">
        <Button
          asChild
          className="size-[22px] w-fit rounded-full bg-transparent p-0 text-app_black hover:bg-transparent"
          title="reload list"
          onClick={() => refetch()}
        >
          <RotateCw size={20} className="cursor-pointer" />
        </Button>

        <TextTag className="self-start">total: {data?.length}</TextTag>

        {isFetching ? (
          <LoaderCircle className="ml-12 animate-spin text-app_blue" />
        ) : null}
      </DivCard>

      <UserTable userProfiles={data!} isLoading={isLoading} />

      {/* <pre className="max-w-default_app_max_w overflow-auto">
        {JSON.stringify(data, null, 4)}
      </pre> */}
    </DivCard>
  );
}
