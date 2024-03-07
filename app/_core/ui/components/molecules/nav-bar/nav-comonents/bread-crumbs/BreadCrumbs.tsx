'use client';

import { flex_template } from '@/_core/ui/theme';
import { TextTag } from '@/components/atoms';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDocStore } from '@/store/zustand';
import { shortenText } from '@/utils/helpers';

interface Props {
  //
};

const StyledBreadCrumbs = styled.div`
  ${flex_template};
  gap: 0;

  @media only screen and (max-width: 880px) {
    display: none; 
  }
`;

export default function BreadCrumbs({ }: Props) {
  const pathname = usePathname();

  const { currentFolder } = useDocStore();

  let currentLink = '';

  const arr_crumbs: string[] = []; // to keep track of links

  const crumbs = pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, i) => {
      currentLink += `/${crumb}`;

      arr_crumbs.push(crumb);

      let add_trails = false;

      let route_crumb = crumb;

      if (i > 1 && arr_crumbs[i - 1] && (arr_crumbs[i - 1] === 'root') && currentFolder !== 'root') {
        if (currentFolder.parent_id !== 'root') {
          // meaning you are in a sub-directory that's not immediately under root dir.
          add_trails = true;
        }

        route_crumb = currentFolder.name;
      };

      return (
        <Link key={crumb + i} href={String(currentLink)}>
          <TextTag cursor='pointer'>
            / {add_trails ? '... /' : ''} {shortenText(route_crumb, 15)}
          </TextTag>
        </Link>
      );
    });

  /*
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
  */

  return (
    <StyledBreadCrumbs>
      {crumbs}
    </StyledBreadCrumbs>
  );
};
