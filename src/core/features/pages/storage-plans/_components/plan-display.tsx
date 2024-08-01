import StyledStoragePlanDisplay from "../../../dummy-data/styled-storage-plan-display";
import StoragePlan from "./storage-plan";
import { getStoragePlans } from "@/core/config/firebase/fire-store/app-data";

import type { StoragePlan as StoragePlanType } from "@/core/interfaces/entities";

interface Props {}

export default async function PlanDisplay({}: Props) {
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
        <StoragePlan key={plan.label} plan={plan} />
      ))}
    </StyledStoragePlanDisplay>
  );
}
