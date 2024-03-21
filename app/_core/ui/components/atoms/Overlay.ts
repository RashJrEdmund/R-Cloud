'use client';

import { THEME_PALETTE } from '@/core/ui/theme';
import styled from '@emotion/styled';
import type { CommonProps } from './common/types';

interface Props extends CommonProps {
  show: boolean;
}

const { colors: COLORS } = THEME_PALETTE;

const Overlay = styled.div<Props>`
  visibility: ${({ visibility = 'visible' }) => visibility};
  display: ${({ show }) => show ? 'unset' : 'none'};
  
  // positioning
  position: ${({ position = 'fixed' }) => position};
  top: ${({ top = '0' }) => top};
  right: ${({ right = 'unset' }) => right};
  bottom: ${({ bottom = 'unset' }) => bottom};
  left: ${({ left = '0' }) => left};
  transform: ${({ transform = 'unset' }) => transform};

  width: ${({ width = '100%' }) => width};
  height: ${({ height = '100%' }) => height};
  z-index: ${({ z_index = '4' }) => z_index};
  background: ${COLORS.overlay_gradient};

  ${({ sx }) => sx};
`;

export default Overlay;
