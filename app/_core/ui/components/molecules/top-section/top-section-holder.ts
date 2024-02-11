'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE } from '@/core/ui/theme';

const {
  dimensions: DIMENSIONS,
} = THEME_PALETTE;

const TopSectionHolder = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 1rem auto 2rem;
  width: ${DIMENSIONS.secondary_app_width};
  height: fit-content;
`;

export default TopSectionHolder;
