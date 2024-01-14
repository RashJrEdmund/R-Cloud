'use client';

import { THEME_PALLETE, flex_template } from '@/_core/ui/theme';
import styled from '@emotion/styled';

const {
  colors: COLORS,
} = THEME_PALLETE;

const StyledFileFolderDisplay = styled.section`
  ${flex_template}
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  background-color: ${COLORS.bg_light};
  width: min(100%, 1000px);
  height: fit-content;
  min-height: min(500px, 80vh);
`;

export default StyledFileFolderDisplay;
