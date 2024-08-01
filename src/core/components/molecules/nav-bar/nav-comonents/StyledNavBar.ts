"use client";

import { THEME_PALETTE, flex_template } from "@/core/ui/theme";
import styled from "@emotion/styled";

const { colors: COLORS, dimensions: DIMENSIONS } = THEME_PALETTE;

const StyledNavBar = styled.nav`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
  width: 100%;
  height: fit-content;

  .nav_holder {
    width: ${DIMENSIONS.primary_app_width};
    margin: 0 auto;
    padding: 10px 1rem;
    ${flex_template}
    justify-content: space-between;
    position: relative; // main purpose is to help NavTitle component always stay in the middle;

    .logo-x-crumbs {
      ${flex_template}
    }
  }
`;

export default StyledNavBar;
