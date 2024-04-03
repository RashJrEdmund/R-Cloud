'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE } from '@/core/ui/theme';

const {
  dimensions: DIMENSIONS,
} = THEME_PALETTE;

const StyledStoragePlanDisplay = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1rem 10px;
  align-items: center;
  justify-content: center;
  width: ${DIMENSIONS.tertiary_app_width};
  height: fit-content;
  min-height: 400px;
  margin: 0 auto;
  padding: 0 0 3rem
`;

export default StyledStoragePlanDisplay;
