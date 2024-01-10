'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledIllustrationHolder = styled.section`
  display: flex;

  .card {
    ${flex_template}
    flex-direction: column;
  }
`;

export default StyledIllustrationHolder;
