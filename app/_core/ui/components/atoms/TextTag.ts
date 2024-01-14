'use client';

import { THEME_PALLETE, flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { createHoverEffect } from './common/functions';
import type {
  CommonProps,
  CursorVariants,
  SizeVariants,
  WeightVaraints
} from './common/types';

const { colors: COLORS } = THEME_PALLETE;

type IColor = 'grayed' | 'normal' | 'invert' | 'dark' | 'light' | 'success';

interface Props extends CommonProps {
  no_white_space?: boolean;
  ellipsis?: boolean; // to create ellipsis, works hand in hand with no_white_space
  color_type?: IColor,
  weight?: WeightVaraints;
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
  case 'light':
    return COLORS.text_white;
  case 'dark':
    return COLORS.text_dark;
  default:
    return COLORS.text;
  }
};

const TextTag = styled.span<Props>`
    width: ${({ width = 'fit-content' }) => width};
    min-width: ${({ min_width = 'none' }) => min_width};
    height: fit-content;

    font-weight: ${({ weight = '400' }) => weight}; // 400 is defualt and normal font-weight, 700 is bold
    font-size: ${({ size = '1rem' }) => size}; // 1rem is defualt text size and 2rem is for like h1s
    color: ${({ color_type = 'normal' }) => generateColor(color_type)};
    white-space: ${({ no_white_space = false }) => no_white_space ? 'nowrap' : 'normal'};
    text-overflow: ${({ ellipsis = false }) => ellipsis ? 'ellipsis' : 'unset'};

    ${flex_template}
    gap: ${({ gap = '3px' }) => gap};
    margin: ${({ margin = '0 2.5px' }) => margin};
    padding: ${({ padding = '0' }) => padding};
    border: ${({ border }) => border ? `1px solid ${COLORS.border}` : 'none'};

    cursor: ${({ cursor = 'text' }) => cursor};

    ${({ hover_effect = 'none' }) => createHoverEffect(hover_effect)}

    ${({ sx }) => sx};

    @media only screen and (max-width: 900px) {
        color: ${({ media_color, color_type }) => generateColor(media_color ?? color_type ?? 'normal')};
        font-size: ${({ media_size, size }) => (media_size ?? size ?? '1rem')}; // 1rem is defualt text size and 2rem is for like h1s
    }
`;

export default TextTag;
