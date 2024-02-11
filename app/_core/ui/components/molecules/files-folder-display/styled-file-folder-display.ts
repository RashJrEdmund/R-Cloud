'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE } from '@/core/ui/theme';

const {
  dimensions: DIMENSIONS,
} = THEME_PALETTE;

const StyledFileFolderDisplay = styled.section`
  /* background-color: gray; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  row-gap: 0;
  align-items: start;
  justify-content: flex-start;
  width: ${DIMENSIONS.secondary_app_width};
  height: fit-content;
  /* min-height: 80vh; */
`;

export default StyledFileFolderDisplay;
