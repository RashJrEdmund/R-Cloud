"use client";

import { DivCard } from "@/components/atoms";
import {
  ColumnLayout,
  DisplayLayout,
  Navigator,
} from "@/components/molecules/top-section/components";
import { RotateCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "@/components/ui/tooltip";

export default function WithMeTopSection() {
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries({
      queryKey: ["shared-with-me"],
    });
  };

  return (
    <DivCard className="mx-auto mb-4 h-fit w-primary_app_w justify-between p-[10px]">
      <DivCard className="gap-8">
        <Navigator />

        <Tooltip title="refresh data">
          <RotateCw
            size={20}
            className="cursor-pointer"
            onClick={handleRefetch}
          />
        </Tooltip>
      </DivCard>

      <DivCard className="gap-4">
        <ColumnLayout />

        <DisplayLayout />
      </DivCard>
    </DivCard>
  );
}
