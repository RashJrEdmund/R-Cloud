'use client';

import { THEME_PALETTE, flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { createHoverEffect } from './common/functions';
import type {
  CommonProps,
  CursorVariants,
  SizeVariants,
  WeightVariants
} from './common/types';

const { colors: COLORS } = THEME_PALETTE;

type IColor = 'inherit' | 'grayed' | 'normal' | 'invert' | 'dark' | 'light' | 'success' | 'error';

interface Props extends CommonProps {
  no_white_space?: boolean;
  ellipsis?: boolean; // to create ellipsis, works hand in hand with no_white_space
  text_align?: 'center' | 'left' | 'right';
  color_type?: IColor,
  weight?: WeightVariants;
  size?: SizeVariants;
  cursor?: CursorVariants;
  media_color?: IColor; // for switching colors on media querries
  media_size?: SizeVariants; // for switching sizes on media querries;
}

const generateColor = (text: IColor) => {
  switch (text) {
    case 'grayed':
      return COLORS.text_grayed;
    case 'invert':
      return COLORS.text_invert;
    case 'success':
      return COLORS.text_blue;
    case 'error':
      return COLORS.border_error;
    case 'light':
      return COLORS.text_white;
    case 'dark':
      return COLORS.text_dark;
    case 'normal':
      return COLORS.text;
    default: // text inherit
      return 'inherit';
  }
};

const TextTag = styled.span<Props>`
  visibility: ${({ visibility = 'visible' }) => visibility};
  width: ${({ width = 'fit-content' }) => width};
  min-width: ${({ min_width = 'unset' }) => min_width};
  max-width: ${({ max_width = 'unset' }) => max_width};

  height: ${({ height = 'fit-content' }) => height};
  min-height: ${({ min_height = 'unset' }) => min_height};
  max-height: ${({ max_height = 'none' }) => max_height};

  overflow-x: ${({ over_flow_x = 'unset', ellipsis = false }) => {
    if (ellipsis && over_flow_x === 'unset') return 'hidden';
    return over_flow_x;
  }};
  overflow-y: ${({ over_flow_y = 'unset' }) => over_flow_y};

  // positioning
  position: ${({ position = 'unset' }) => position};
  top: ${({ top = 'unset' }) => top};
  right: ${({ right = 'unset' }) => right};
  bottom: ${({ bottom = 'unset' }) => bottom};
  left: ${({ left = 'unset' }) => left};
  transform: ${({ transform = 'unset' }) => transform};
  z-index: ${({ z_index = 'unset' }) => z_index};

  font-weight: ${({ weight = '400' }) => weight}; // 400 is defualt and normal font-weight, 700 is bold
  font-size: ${({ size = '1rem' }) => size}; // 1rem is defualt text size and 2rem is for like h1s
  color: ${({ color_type = 'inherit' }) => generateColor(color_type)};
  white-space: ${({ no_white_space = false, ellipsis = false }) => (no_white_space || ellipsis) ? 'nowrap' : 'normal'};
  text-overflow: ${({ ellipsis = false }) => ellipsis ? 'ellipsis' : 'unset'};
  text-align: ${({ text_align = 'center' }) => text_align};

  ${flex_template}
  gap: ${({ gap = '3px' }) => gap};
  margin: ${({ margin = '0 2.5px' }) => margin};
  padding: ${({ padding = '0' }) => padding};
  border: ${({ border }) => border ? `1px solid ${COLORS.border}` : 'none'};
  border-radius: ${({ radius = '0' }) => radius};

  cursor: ${({ cursor = 'inherit' }) => cursor};

  ${({ hover_effect = 'none' }) => createHoverEffect(hover_effect)}

  ${({ sx }) => sx};

  @media only screen and (max-width: 900px) {
    color: ${({ media_color, color_type }) => generateColor(media_color ?? color_type ?? 'normal')};
    font-size: ${({ media_size, size }) => (media_size ?? size ?? '1rem')}; // 1rem is defualt text size and 2rem is for like h1s
  }

  @media only screen and (max-width: 650px) {
    ${({ media_sx = '' }) => media_sx}
  }
`;

export default TextTag;
