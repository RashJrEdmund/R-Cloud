'use client';

import { THEME_PALLETE, flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const { colors: COLORS } = THEME_PALLETE;

const StyledFormWrapper = styled.section`
  ${flex_template}
  justify-content: space-between;
  width: fit-content;
  min-width: min(97vw, 1000px);
  border: 1px solid ${COLORS.border};

  .form {
    ${flex_template}
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid ${COLORS.border};
    width: min(100%, 400px);
    margin: auto;
    /* width: 100%; */
  }

  .img-holder {
    /* width: 100%; */
  }
`;

export default StyledFormWrapper;
