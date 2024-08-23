"use client";

import styled from "@emotion/styled";
import { THEME_PALETTE } from "@/core/ui/theme";

const { colors: COLORS, dimensions: DIMENSIONS } = THEME_PALETTE;

const StyledFileFolderDisplay = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  row-gap: 0;
  align-items: start;
  justify-content: flex-start;
  width: ${DIMENSIONS.primary_app_width};
  /* width: min(97vw, 100%); */
  height: fit-content;

  &.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    row-gap: 0;
    gap: 10px;
  }

  &.list-layout {
    display: flex;
    flex-direction: column;

    .card {
      border-top: 0.5px solid ${COLORS.bg_light};
      transition: background 200ms;

      &:hover {
        background-color: ${COLORS.bg_light};
      }
    }
  }

  @media only screen and (max-width: 650px) {
    &.grid-layout {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    }
  }
`;

export default StyledFileFolderDisplay;
