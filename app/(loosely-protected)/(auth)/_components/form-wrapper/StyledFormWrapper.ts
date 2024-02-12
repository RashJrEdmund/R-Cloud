'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledFormWrapper = styled.section`
  ${flex_template}
  justify-content: space-between;
  width: fit-content;
  min-width: min(97vw, 1000px);
  max-width: 97vw;

  .form {
    ${flex_template}
    flex-direction: column;
    align-items: flex-start;
    width: min(100%, 400px);
    margin: 0 auto;
    gap: 10px;
    /* width: 100%; */

    .keep-me-logged-in {
      ${flex_template}
      gap: 6px;
      margin: 5px 0;
    }
  }

  .img-holder {
    /* width: 100%; */
  }

  @media only screen and (max-width: 900px) {
    .img-holder {
      img {
        display: none;
      }
    }
  }
`;

export default StyledFormWrapper;
