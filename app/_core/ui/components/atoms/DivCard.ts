'use client';

import { THEME_PALLETE } from '@/core/ui/theme';
import styled from '@emotion/styled';
import {
  generateBg,
  createUpDownAnimation,
  createHoverEffect
} from './common/functions';

import type {
  FLexAlignVariants,
  FlexJustifyVariants,
  FlexDirectionVariants,
  FlexWrapVariants,
  HoverEffectVariants,
  CommonProps,
  CursorVariants,
} from './common/types';

const {
  colors: COLORS,
  effects: EFFECTS,
} = THEME_PALLETE;

interface Props extends CommonProps {
  animate_up_down?: boolean;
  cursor?: CursorVariants;
  align?: FLexAlignVariants;
  justify?: FlexJustifyVariants;
  align_self?: FLexAlignVariants;
  justify_self?: FlexJustifyVariants;
  flex_dir?: FlexDirectionVariants;
  flex_wrap?: FlexWrapVariants;
  hover_effect?: HoverEffectVariants;
};

const DivCard = styled.div<Props>`
  visibility: ${({ visibility = 'visible' }) => visibility};
  display: flex;
  justify-content: ${({ justify = 'space-between' }) => justify};
  align-items: ${({ align = 'center' }) => align};
  align-self: ${({ align_self = 'unset' }) => align_self};
  justify-self: ${({ justify_self = 'unset' }) => justify_self};
  flex-wrap: ${({ flex_wrap = 'unset' }) => flex_wrap};

  gap: ${({ gap = 'unset' }) => gap};
  padding: ${({ padding = '0' }) => padding};
  margin: ${({ margin = '0' }) => margin};
  box-shadow: ${({ shadow_effect }) => shadow_effect ? EFFECTS.box_shadow : 'none'};
  flex-direction: ${({ flex_dir = 'unset' }) => flex_dir};
  border: ${({ border }) => border ? `1px solid ${COLORS.border}` : 'none'};
  border-radius: ${({ radius = '0' }) => radius};

  // positioning
  position: ${({ position = 'unset' }) => position};
  top: ${({ top = 'unset' }) => top};
  right: ${({ right = 'unset' }) => right};
  bottom: ${({ bottom = 'unset' }) => bottom};
  left: ${({ left = 'unset' }) => left};
  transform: ${({ transform = 'unset' }) => transform};
  z-index: ${({ z_index = 'unset' }) => z_index};

  cursor: ${({ cursor = 'default' }) => cursor};

  outline: none;
  width: ${({ width = 'fit-content' }) => width};
  min-width: ${({ min_width = 'unset' }) => min_width};
  max-width: ${({ max_width = 'none' }) => max_width};

  height: ${({ height = 'fit-content' }) => height};
  min-height: ${({ min_height = 'unset' }) => min_height};
  max-height: ${({ max_height = 'none' }) => max_height};

  overflow-x: ${({ over_flow_x }) => over_flow_x ? 'auto' : 'unset'};
  overflow-y: ${({ over_flow_y }) => over_flow_y ? 'auto' : 'unset'};

  ${({ bg = 'normal' }) => generateBg(bg)}

  ${({ animate_up_down = false }) => createUpDownAnimation(animate_up_down)}

  ${({ hover_effect = 'none' }) => createHoverEffect(hover_effect)}

  ${({ sx }) => sx};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default DivCard;
