'use client';

import { THEME_PALLETE, flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { createHoverEffect, generateBg } from './common/functions';
import { CommonProps, CursorVariants } from './common/types';

const {
  colors: COLORS,
  effects: EFFECTS,
} = THEME_PALLETE;

interface Props extends CommonProps {
  no_white_space?: boolean;
  cursor?: CursorVariants;
};

const Button = styled.button<Partial<Props>>`
  color: ${COLORS.text_light};
  padding: ${({ padding = '4px 15px' }) => padding};
  margin: ${({ margin = '0' }) => margin};
  border-radius: ${({ radius = '4px' }) => radius};
  box-shadow: ${({ shadow_effect }) => shadow_effect ? EFFECTS.box_shadow : 'none'};
  border: ${({ border }) => border ? `1px solid ${COLORS.border}` : 'none'};
  white-space: ${({ no_white_space = false }) => no_white_space ? 'nowrap' : 'normal'};

  width: ${({ width = 'fit-content' }) => width};
  min-width: ${({ min_width = 'none' }) => min_width};

  ${flex_template};
  gap: ${({ gap = '5px' }) => gap};

  cursor: ${({ cursor = 'pointer' }) => cursor};

  ${({ bg = 'normal' }) => generateBg(bg)}

  ${({ hover_effect = 'none' }) => createHoverEffect(hover_effect)}

  ${({ sx = '' }) => sx};
`;

export default Button;
