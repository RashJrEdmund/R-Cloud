'use client';

import { flex_template } from '@/_core/ui/theme';
import { TextTag } from '@/components/atoms';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  //
};

const StyledBreadCrumbs = styled.div`
  ${flex_template};
  gap: 0;

  @media only screen and (max-width: 950px) {
    display: none; 
  }
`;

export default function BreadCrumbs({ }: Props) {
  const pathname = usePathname();

  let currentLink = '';

  const crumbs = pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, i) => {
      currentLink += `/${crumb}`;

      return (
        <Link key={crumb + i} href={String(currentLink)}>
          <TextTag cursor='pointer'>
            / {crumb}
          </TextTag>
        </Link>
      );
    });

  return (
    <StyledBreadCrumbs>
      {crumbs}
    </StyledBreadCrumbs>
  );
};
