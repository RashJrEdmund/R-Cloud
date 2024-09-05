import StyledStoragePlanDisplay from "../../../dummy-data/styled-storage-plan-display";
import StoragePlan from "./storage-plan";
import { getStoragePlans } from "@/core/config/firebase/fire-store/app-data";

import type { StoragePlan as StoragePlanType } from "@/core/interfaces/entities";

interface Props {
  /**
   * to know weather or not to allow editing as if in dashboard.
  */
  isInDashboard?: boolean;
}

export default async function PlanDisplay({ isInDashboard = false }: Props) {
  const STORAGE_PLANS: Array<StoragePlanType> | undefined =
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
        <StoragePlan
          isInDashboard={!!isInDashboard}
          key={plan.label}
          plan={plan}
        />
      ))}
    </StyledStoragePlanDisplay>
  );
}
