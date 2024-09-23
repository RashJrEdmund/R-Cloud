"use client";

import { DivCard } from "@/components/atoms";
import {
  DisplayLayout,
  Navigator,
} from "@/components/molecules/top-section/components";
import { RotateCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function WithMeTopSection() {
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries({
      queryKey: ["shared-with-me"],
    });
  };

  return (
    <DivCard className="mx-auto mb-4 h-fit w-primary_app_w justify-between p-[10px]">
      <Navigator />

      <DivCard className="gap-4">
        <RotateCw className="cursor-pointer" onClick={handleRefetch} />

        <DisplayLayout />
      </DivCard>
    </DivCard>
  );
}
