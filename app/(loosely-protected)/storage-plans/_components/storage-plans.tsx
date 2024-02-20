import { DivCard, TextTag } from '@/components/atoms';
import { STORAGE_PLANS } from '@/core/ui/ui-constants';
import StyledStoragePlanDisplay from './styled-storage-plan-display';
import { StoragePlan } from '@/components/molecules';

interface Props { };

export default function PlanDisplay({ }: Props) {
  // TODO +=> Query storage plans from db.

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
          STORAGE_PLANS.map((plan) => (
            <StoragePlan key={plan.label} plan={plan} />
          ))
        }
      </StyledStoragePlanDisplay>
    </DivCard>
  );
};
