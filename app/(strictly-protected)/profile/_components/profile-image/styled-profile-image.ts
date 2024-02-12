'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledProfileImage = styled.section`
  ${flex_template}
  flex-direction: column;
  border: 0.5px solid #ccc;
  width: min(90vw, 250px);
  height: fit-content;
  margin: 0 0 1rem;

  img {
    width: 100%;
  }
`;

export default StyledProfileImage;
