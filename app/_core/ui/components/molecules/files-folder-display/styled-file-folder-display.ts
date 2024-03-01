'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE, flex_template } from '@/core/ui/theme';

const {
  colors: COLORS,
  dimensions: DIMENSIONS,
} = THEME_PALETTE;

const StyledFileFolderDisplay = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  row-gap: 0;
  align-items: start;
  justify-content: flex-start;
  width: ${DIMENSIONS.secondary_app_width};
  height: fit-content;

  &.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    row-gap: 0;
  }

  &.list-layout {
    display: flex;
    flex-direction: column;

    .card {
      border-top: 0.5px solid ${COLORS.bg_light};

      &:nth-of-type(2n) {
        background-color: ${COLORS.bg_light};
      }
    }
  }
`;

export default StyledFileFolderDisplay;
