"use client";

import styled from "@emotion/styled";
import { THEME_PALETTE } from "@/core/ui/theme";

const { dimensions: DIMENSIONS } = THEME_PALETTE;

const StyledProfileDisplay = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  gap: 1rem;
  width: ${DIMENSIONS.secondary_app_width};
  height: fit-content;
  padding: 2rem 0;

  /* @media only screen and (max-width: 650px) {
    flex-direction: column;
  } */
`;

export default StyledProfileDisplay;
