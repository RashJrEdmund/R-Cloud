'use client';

import styled from '@emotion/styled';

interface Props {

};

const StyledNavTitle = styled.section`
  position: absolute; // sive nav-bar itself has position relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function NavTitle({ }: Props) {
  return (
    <StyledNavTitle>
      NavTitle
    </StyledNavTitle>
  );
};
