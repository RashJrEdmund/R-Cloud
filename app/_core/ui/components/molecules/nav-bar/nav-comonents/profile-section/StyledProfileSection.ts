'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledProfileSection = styled.section`
  width: fit-content;
  ${flex_template}
  gap: 7px;

  img {
    border: 1px solid gray;
    border-radius: 100%;
    object-fit: contain;
    width: 35px;
    height: 35px;
  }
`;

export default StyledProfileSection;
