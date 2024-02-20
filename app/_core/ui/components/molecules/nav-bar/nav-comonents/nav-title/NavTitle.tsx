'use client';

import { TextTag } from '@/components/atoms';
import { useUserStore } from '@/store/zustand';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';

interface Props {

};

const StyledNavTitle = styled.section`
  position: absolute; // side nav-bar itself has position relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;

  span {
    a {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media only screen and (max-width: 600px) {
   display: none; 
  }
`;

export default function NavTitle({ }: Props) {
  const [navProperties, setNavProperties] = useState<{
    route_name: string;
    route_url: string
  }>({ route_name: '...', route_url: '' });

  const { currentUser } = useUserStore();

  useLayoutEffect(() => {
    if (currentUser) setNavProperties({ route_name: 'Home', route_url: '/home' });
    else setNavProperties({ route_name: 'R-Cloud', route_url: '/' });
  }, [currentUser]);

  return (
    <StyledNavTitle>
      <TextTag>
        <Link href={navProperties.route_url}>
          {navProperties.route_name}
        </Link>
      </TextTag>
    </StyledNavTitle>
  );
};
