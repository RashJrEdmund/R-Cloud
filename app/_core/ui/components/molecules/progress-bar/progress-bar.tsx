'use client';

import { DivCard } from '@/components/atoms';
import { useEffect, useState } from 'react';

import type { BgVariants } from '@/components/atoms/common/types';

interface Props {
  height?: string;
  width?: string;

  progress_in_percentage: number;

  inner_radius?: string;
  outer_radius?: string;

  show_usage_colors?: boolean; // weather or not to show usage colors;
};

export default function ProgressBar({
  progress_in_percentage,

  height = '20px',
  width = '100%',

  outer_radius = '8px',
  inner_radius = '10px',

  show_usage_colors = false,
}: Props) {
  const [color, setColor] = useState<BgVariants>('blued');

  useEffect(() => {
    if (show_usage_colors) {
      // write logic to differentiate coloring based on progress_in_percentage;
    }
  }, [show_usage_colors]);

  return (
    <DivCard bg='grayed' width={width} height={height} radius={outer_radius} position='relative'>
      <DivCard
        width={progress_in_percentage + '%'} /* eg 90% */
        height='100%'
        position='absolute'
        left='0'
        top='0'
        radius={inner_radius}
        bg={color}
      />
    </DivCard>
  );
};
