'use client';

import { DivCard } from '@/components/atoms';
import { useEffect, useMemo, useState } from 'react';
import { THEME_PALETTE } from '@/core/ui/theme';

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
  const [color, setColor] = useState<string>('orange');

  const APP_COLOR = useMemo(() => THEME_PALETTE.colors, []);

  useEffect(() => {
    if (show_usage_colors) {
      if (progress_in_percentage <= 50) {
        setColor(APP_COLOR.app_blue);
      } else if (progress_in_percentage <= 70) {
        setColor(APP_COLOR.orange);
      } else if (progress_in_percentage <= 99) {
        setColor(APP_COLOR.border_error);
      } else {
        setColor(APP_COLOR.black);
      }
    }
  }, [show_usage_colors, progress_in_percentage, APP_COLOR]);

  return (
    <DivCard bg='grayed' width={width} height={height} radius={outer_radius} position='relative'>
      <DivCard
        width={progress_in_percentage + '%'} /* eg 95% */
        height='100%'
        position='absolute'
        left='0'
        top='0'
        radius={inner_radius}
        sx={`
          background-color: ${color}
        `}
      />
    </DivCard>
  );
};
