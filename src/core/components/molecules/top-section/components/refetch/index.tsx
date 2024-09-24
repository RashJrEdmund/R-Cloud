"use client";

import { useDocStore } from "@/providers/stores/zustand";
import { RotateCw } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

export default function Refetch() {
  const { toggleRefetchDocs } = useDocStore();

  return (
    <Tooltip title="refresh folder">
      <RotateCw size={20} onClick={toggleRefetchDocs} />
    </Tooltip>
  );
}
