"use client";

import { flex_template } from "@/core/ui/theme";
import styled from "@emotion/styled";

const StyledIllustrations = styled.div`
  ${flex_template}
  width: 100%;

  @media only screen and (max-width: 1000px) {
    .illustration:nth-of-type(2) {
      display: none;
    }
  }
`;

export { StyledIllustrations };
