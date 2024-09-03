"use client";

import { DivCard } from "@/components/atoms";
import { useParams } from "next/navigation";

export default function DashboardSingleUsePage() {
  const params = useParams<{ user_id: string }>();

  return (
    <DivCard className="h-auto w-full flex-col justify-start">
      welcome reading user {decodeURIComponent(params.user_id)}
    </DivCard>
  );
};
