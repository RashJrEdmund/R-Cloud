"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/core/interfaces/entities";

export default function TopSection({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data?: Array<UserProfile>;
}) {
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.refetchQueries({ queryKey: ["dashboard", "users"] });
  };

  return (
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
  );
}
