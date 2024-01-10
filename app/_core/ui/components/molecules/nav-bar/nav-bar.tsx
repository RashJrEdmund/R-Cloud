'use client';

import { TextTag } from '@/components/atoms';
import BreadCrumbs from '../bread-crumbs/BreadCrumbs';
import {
  NavTitle,
  ProfileSection,
  StyledNavBar
} from './nav-comonents';

interface Props {

};

export default function NavBar({ }: Props) {
  return (
    <StyledNavBar>
      <section className='nav_holder'>
        <section className='logo-x-crumbs'>
          <TextTag no_white_space color_type='grayed'>
            R-Cloud
          </TextTag>

          <BreadCrumbs />
        </section>

        <NavTitle />

        <ProfileSection />
      </section>
    </StyledNavBar>
  );
};
