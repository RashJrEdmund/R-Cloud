'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

interface Props {
  //
};

const StyledFormOrSeparator = styled.section`
  ${flex_template};
  width: 100%;
  gap: 5px;
  margin: 10px auto;
`;

export default function FormOrSeparator({ }: Props) {
  return (
    <StyledFormOrSeparator>
      <svg xmlns='http://www.w3.org/2000/svg' width='182' height='1' viewBox='0 0 182 1' fill='none'>
        <path d='M182 0.5H0.5' stroke='#D9D9D9' />
      </svg>
      or
      <svg xmlns='http://www.w3.org/2000/svg' width='182' height='1' viewBox='0 0 182 1' fill='none'>
        <path d='M182 0.5H0.5' stroke='#D9D9D9' />
      </svg>
    </StyledFormOrSeparator>
  );
};
