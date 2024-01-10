'use client';

import { THEME_PALLETE } from '@/core/ui/theme';
import styled from '@emotion/styled';
import {
  CommonProps,
  FLexAlignVariants,
  FlexDirectionVariants,
  FlexJustifyVariants
} from './common/types';
import { createHoverEffect, generateBg } from './common/functions';

const {
  colors: COLORS,
  dimensions: DIMENSIONS,
  effects: EFFECTS,
} = THEME_PALLETE;

interface Props extends CommonProps {
  align?: FLexAlignVariants;
  justify?: FlexJustifyVariants;
  flex_dir?: FlexDirectionVariants;
}

const MainTag = styled.main<Props>`
  display: flex;
  align-items: ${({ align = 'center' }) => align};
  justify-content: ${({ justify = 'start' }) => justify};
  flex-direction: ${({ flex_dir = 'column' }) => flex_dir};
  gap: ${({ gap = 'unset' }) => gap};

  width: ${({ width = DIMENSIONS.app_width }) => width};
  min-width: ${({ min_width = 'none' }) => min_width};
  min-height: min(800px, calc(100vh - 100px));

  margin: ${({ margin = '0 auto' }) => margin};
  padding: ${({ padding = '2rem 0' }) => padding};
  border: ${({ border }) => border ? `1px solid ${COLORS.border}` : 'none'};
  border-radius: ${({ radius = '4px' }) => radius};
  box-shadow: ${({ shadow_effect }) => shadow_effect ? EFFECTS.box_shadow : 'none'};

  ${({ hover_effect = 'none' }) => createHoverEffect(hover_effect)}
  ${({ bg = 'none' }) => generateBg(bg)}

  ${({ sx }) => sx};
`;

export default MainTag;
