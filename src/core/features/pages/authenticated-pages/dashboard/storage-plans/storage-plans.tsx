import { DivCard } from "@/components/atoms";
import { Suspense } from "react";
import PlanDisplay from "@/features/pages/storage-plans/_components/plan-display";
import PlanDisplayShimmer from "@/features/pages/storage-plans/_components/plan-display-shimmer";

export default function DashboardStoragePlansPage() {
  return (
    <DivCard className="h-auto w-full flex-col justify-start">
      <Suspense fallback={<PlanDisplayShimmer />}>
        <PlanDisplay isInDashboard />
      </Suspense>
    </DivCard>
  );
}
