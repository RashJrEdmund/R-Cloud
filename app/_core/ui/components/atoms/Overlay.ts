'use client'

import { THEME_PALLETE } from '@/core/ui/theme';
import styled from '@emotion/styled';

interface Props {
  show: boolean;
  position?: 'fixed' | 'absolute' | 'relative';
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  z?: string;
}

const { colors: COLORS } = THEME_PALLETE;

const Overlay = styled.div<Props>`
  display: ${({ show }) => show ? 'unset' : 'none'};
  position: ${({ position = 'fixed' }) => position};
  top: ${({ top = '0' }) => top};
  left: ${({ left = '0' }) => left};
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '100%' }) => height};
  z-index: ${({ z = '4' }) => z};
  background: ${COLORS.overlay_gradient};
`;

export default Overlay;
