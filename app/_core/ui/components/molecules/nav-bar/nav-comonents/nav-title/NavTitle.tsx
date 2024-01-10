'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {

};

const StyledNavTitle = styled.section`
  position: absolute; // sive nav-bar itself has position relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
`;

export default function NavTitle({ }: Props) {
  const [navTitle, setNavTitle] = useState('...');

  const pathname = usePathname();

  useEffect(() => {
    const name = pathname.split('/').pop();

    if (name) setNavTitle(name);
    else setNavTitle('R-Cloud');

  }, [pathname]);

  return (
    <StyledNavTitle>
      {navTitle}
    </StyledNavTitle>
  );
};
