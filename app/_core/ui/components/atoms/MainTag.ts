'use client';

import { THEME_PALLETE } from '@/core/ui/theme';
import styled from '@emotion/styled';
import type {
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
  visibility: ${({ visibility = 'visible' }) => visibility};
  display: flex;
  align-items: ${({ align = 'center' }) => align};
  justify-content: ${({ justify = 'start' }) => justify};
  flex-direction: ${({ flex_dir = 'column' }) => flex_dir};
  gap: ${({ gap = 'unset' }) => gap};

  width: ${({ width = DIMENSIONS.app_width }) => width};
  min-width: ${({ min_width = 'none' }) => min_width};
  max-width: ${({ max_width = 'none' }) => max_width};

  height: ${({ height = 'fit-content' }) => height};
  min-height: ${DIMENSIONS.main_min_height};
  max-height: ${({ max_height = 'none' }) => max_height};

  overflow-x: ${({ over_flow_x }) => over_flow_x ? 'auto' : 'unset'};
  overflow-y: ${({ over_flow_y }) => over_flow_y ? 'auto' : 'unset'};

  // positioning
  position: ${({ position = 'unset' }) => position};
  top: ${({ top = 'unset' }) => top};
  right: ${({ right = 'unset' }) => right};
  bottom: ${({ bottom = 'unset' }) => bottom};
  left: ${({ left = 'unset' }) => left};
  transform: ${({ transform = 'unset' }) => transform};
  z-index: ${({ z_index = 'unset' }) => z_index};

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
