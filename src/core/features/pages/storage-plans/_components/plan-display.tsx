import { DivCard, TextTag } from "@/components/atoms";
import StyledStoragePlanDisplay from "./styled-storage-plan-display";
import { StoragePlan } from "@/components/molecules";
import { getStoragePlans } from "@/core/config/firebase/fire-store/app-data";

import type { StoragePlan as StoragePlanType } from "@/core/interfaces/entities";

interface Props {}

export default async function PlanDisplay({}: Props) {
  // TODO +=> Query storage plans from db.

  const STORAGE_PLANS: Array<StoragePlanType> = [];

  await getStoragePlans()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        STORAGE_PLANS.push({ ...doc.data(), id: doc.id });
      });
    })
    .then(() => {
      if (STORAGE_PLANS.length <= 0) return;

      STORAGE_PLANS.sort(({ capacity: a }, { capacity: z }) => +a - +z);
    });

  return (
    <DivCard className="w-full flex-col">
      <DivCard as="section" className="mx-auto mb-8">
        <TextTag as="h2">
          <TextTag className="font-semibold text-[1.25rem] text-app_text_blue">
            R-Cloud
          </TextTag>
          <TextTag className="font-semibold text-[1.25rem]">
            Plans and pricing
          </TextTag>
        </TextTag>
      </DivCard>

      <StyledStoragePlanDisplay>
        {STORAGE_PLANS?.map((plan) => (
          <StoragePlan key={plan.label} plan={plan} />
        ))}
      </StyledStoragePlanDisplay>
    </DivCard>
  );
}
