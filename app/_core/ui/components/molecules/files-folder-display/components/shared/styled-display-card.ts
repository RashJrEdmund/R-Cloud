/* FILE_DESC +=> ==================================
| Since file and folder cards have a common style, |
| i've written the shared style here and extended  |
| it in each component that uses it                |
================================================= */

'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE } from '@/_core/ui/theme';

const {
  colors: COLORS,
} = THEME_PALETTE;

export const StyledDisplayCard = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  border: 0.5px solid ${COLORS.border};
  border-radius: 4px;
  padding: 10px;
  width: 120px;
  height: fit-content;
  min-height: 150px;
  margin: 10px auto;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    background-color: ${COLORS.bg_light};
  }

  img {
    width: 100%;
    min-width: 100%;
    max-height: 75px;

    &.custom_img {
      object-fit: cover;
    }
  }

  @media only screen and (max-width: 650px) {
    width: 110px;
    overflow: hidden;
  }
`;
