import StyledStoragePlanDisplay from "../../../dummy-data/styled-storage-plan-display";
import PlanCard from "./plan-card/plan-card";
import { getStoragePlans } from "@/core/config/firebase/fire-store/app-data";

import type { StoragePlan } from "@/core/interfaces/entities";

interface Props {
  /**
   * to know weather or not to allow editing as if in dashboard.
  */
  isInDashboard?: boolean;
}

export default async function PlanDisplay({ isInDashboard = false }: Props) {
  const STORAGE_PLANS: Array<StoragePlan> | undefined =
    await getStoragePlans()
      .then((snapShot) => {
        return snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .then((PLANS) => {
        if (PLANS.length <= 0) return;

        return PLANS.sort(({ capacity: a }, { capacity: z }) => +a - +z);
      });

  return (
    <StyledStoragePlanDisplay>
      {STORAGE_PLANS?.map((plan) => (
        <PlanCard
          isInDashboard={!!isInDashboard}
          key={plan.label}
          plan={plan}
        />
      ))}
    </StyledStoragePlanDisplay>
  );
}
