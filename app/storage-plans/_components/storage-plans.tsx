import { DivCard, TextTag } from '@/components/atoms';

interface Props { };

export default function PlanDisplay({ }: Props) {
  // TODO +=> Query storage plans from db.

  return (
    <>
      <TextTag
        as='h2'
        weight='600'
        margin='10px auto 1rem'
      >Plans and Pricing</TextTag>

      <DivCard bg='light' width='100%' min_height='min(600px, 70vh)'>
        storage-plans
      </DivCard>
    </>
  );
};
