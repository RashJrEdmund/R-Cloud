import { DivCard, TextTag } from '@/components/atoms';
import StyledStoragePlanDisplay from './styled-storage-plan-display';
import { StoragePlan } from '@/components/molecules';
import { getStoragePlans } from '@/core/config/firebase/fire-store/app-data';
import type { IStoragePlan } from '@/interfaces/entities';

interface Props { };

export default async function PlanDisplay({ }: Props) {
  // TODO +=> Query storage plans from db.

  const STORAGE_PLANS: Array<IStoragePlan> = [];

  await getStoragePlans()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        STORAGE_PLANS.push(doc.data());
      });
    }).then(() => {
      if (STORAGE_PLANS.length <= 0) return;

      STORAGE_PLANS.sort(({capacity: a}, {capacity: z}) => +a - +z);
    });

  return (
    <DivCard
      width='100%'
      flex_dir='column'
    >
      <DivCard
        as='section'
        margin='0 auto 2rem'
      >
        <TextTag as='h2'>
          <TextTag weight='600' size='1.25rem' color_type='success'>
            R-Cloud
          </TextTag>
          <TextTag weight='600' size='1.25rem'>
            Plans and pricing
          </TextTag>
        </TextTag>
      </DivCard>

      <StyledStoragePlanDisplay>
        {
          STORAGE_PLANS?.map((plan) => (
            <StoragePlan key={plan.label} plan={plan} />
          ))
        }
      </StyledStoragePlanDisplay>
    </DivCard>
  );
};
