"use client";

import styled from "@emotion/styled";
import { THEME_PALETTE } from "@/core/ui/theme";

const { dimensions: DIMENSIONS } = THEME_PALETTE;

const StyledStoragePlanDisplay = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem 1.2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${DIMENSIONS.secondary_app_w};
  height: fit-content;
  min-height: 400px;
  margin: 0 auto;
  padding: 0 0 3rem;
  /* border: 1px solid grey; */

  @media only screen and (max-width: 1000px) {
    gap: 1rem;
  }
`;

export default StyledStoragePlanDisplay;
