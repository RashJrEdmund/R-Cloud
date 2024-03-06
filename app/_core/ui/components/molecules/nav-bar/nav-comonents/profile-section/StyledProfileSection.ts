'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledProfileSection = styled.section`
  width: fit-content;
  ${flex_template}
  position: relative; // to help profile dropdown component;
  
  a {
    width: fit-content;
    ${flex_template}
    gap: 7px;

    img {
      border: 1px solid gray;
      border-radius: 100%;
      object-fit: cover;
      width: 35px;
      height: 35px;
    }
  }

  @media only screen and (max-width: 950px) {
    .user-name {
      display: none;
    }
  }
`;

export default StyledProfileSection;
