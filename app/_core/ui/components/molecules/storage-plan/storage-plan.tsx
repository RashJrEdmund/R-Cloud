import { Button, DivCard, TextTag } from '@/components/atoms';
import type { IStoragePlan } from '@/interfaces/entities';
import { getSize } from '@/utils/helpers';
import Image from 'next/image';

interface Props {
  plan: IStoragePlan
};

export default function StoragePlan({ plan }: Props) {
  return (
    <DivCard
      shadow_effect
      border
      width='min(100%, 85vw)'
      flex_dir='column'
      bg='white'
      gap='1rem'
      padding='2rem 1.5rem 3rem'
      margin='0 auto'
      position='relative'
      radius='5px'
    >
      {plan.is_free ? (
        <TextTag
          position='absolute'
          top='0'
          left='0'
          size='0.9rem'
          margin='15px'
        >
          free
        </TextTag>
      ) : null}

      <TextTag color_type='success' weight='600' size='1.75rem' media_size='1.5rem'>
        {plan.label}
      </TextTag>

      <Image
        src={plan.icon_url}
        alt={plan.label + ' icon'}
        title={plan.label}
        width={200}
        height={200}
      />

      <DivCard width='100%' flex_dir='column' gap='10px'>
        <TextTag size='2rem' weight='600'>
          {getSize(plan.capacity, plan.unit)}
        </TextTag>

        <TextTag size='0.9rem'>
          {plan.rate}
        </TextTag>
      </DivCard>

      <Button
        width='100%'
        bg={plan.is_free ? 'black' : 'blued'}
        title={'subscribe to plan: ' + plan.label}
        padding='10px'
      >
        {plan.is_free ? 'Current Plan' : 'Buy Plan'}
      </Button>
    </DivCard>
  );
};
