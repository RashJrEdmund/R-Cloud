/* FILE_DESC +=> ==================================
| Since file and folder cards have a common style, |
| i've written the shared style here and extended  |
| it in each component that uses it                |
================================================= */

'use client';

import styled from '@emotion/styled';
import { THEME_PALLETE, flex_template } from '@/_core/ui/theme';

const {
  colors: COLORS,
} = THEME_PALLETE;

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
  margin: 10px;
  cursor: pointer;

  img {
    width: 100%;
    min-width: 100%;
    max-height: 75px;
  }
  
  .bottom {
    .doc_name {
      width: 100%;
      display: flex;
      justify-content: start;
      margin: 5px 0 0;
    }

    .footer {
      width: 100%;
      display: flex;
      align-items: start;
      justify-content: start;
      flex-wrap: nowrap;
      gap: 5px;
      margin: 10px 0 0;
    }
  }
`;
