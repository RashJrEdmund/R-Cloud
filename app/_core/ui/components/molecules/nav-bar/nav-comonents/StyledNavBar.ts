'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledNavBar = styled.nav`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: fit-content;

 .nav_holder {
    width: var(--primary_app_width);
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
