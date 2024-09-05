import { DivCard } from "@/components/atoms";
import { Suspense } from "react";
import PlanDisplay from "@/features/pages/storage-plans/_components/plan-display";
import PlanDisplayShimmer from "@/features/pages/storage-plans/_components/plan-display-shimmer";

export default function DashboardStoragePlansPage() {
  return (
    <DivCard className="h-auto w-full flex-col justify-start">
      {/* <TextTag>dashboard storage plans page</TextTag> */}

      <Suspense fallback={<PlanDisplayShimmer />}>
        <PlanDisplay isInDashboard />
      </Suspense>

      {/* <pre>
        <code>
          {JSON.stringify(data?.docs.map((plan) => ({
            ...plan.data(),
            id: plan.id,
          })), null, 4)}
        </code>
      </pre> */}
    </DivCard>
  );
}
