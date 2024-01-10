'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledProfileSection = styled.section`
  width: fit-content;
  ${flex_template}
  gap: 7px;

  img {
    border: 1px solid black;
    border-radius: 100%;
    width: 30px;
    height: 30px;
  }
`;

export default StyledProfileSection;
