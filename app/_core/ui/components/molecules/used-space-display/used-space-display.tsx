'use client';

import { DivCard, TextTag } from '@/components/atoms';
import { calculatePercentage, getUsedSpaceVisualRepresentation } from '@/utils/helpers';
import { ProgressBar } from '..';
import { useMemo } from 'react';

import type { IUserProfile } from '@/interfaces/entities';

interface Props {
  userProfile: IUserProfile | null;
  width?: string;
}

export default function UsedSpaceDisplay({ userProfile, width = 'min(100%, 500px)'}: Props) {
  const usedSpaceVisualRep = useMemo<number>(() => getUsedSpaceVisualRepresentation(userProfile), [userProfile]);

  return userProfile ? (
    <DivCard width={width} flex_dir='column' align='start' justify='start'>
      <TextTag size='0.9rem'>
        Used space

        <TextTag color_type='success'>
          {calculatePercentage(userProfile?.plan.used_bytes, userProfile?.plan.bytes).ans.toFixed(2)} %
        </TextTag>
      </TextTag>

      <ProgressBar
        show_usage_colors
        progress_in_percentage={usedSpaceVisualRep}
        width='100%'
      />
    </DivCard>
  ) : null;
};
