"use client";

import { TextTag } from "@/components/atoms";
import {
  BreadCrumbs,
  NavTitle,
  ProfileSection,
  StyledNavBar,
} from "./nav-comonents";
import Link from "next/link";

interface Props {}

export default function NavBar({}: Props) {
  return (
    <StyledNavBar>
      <section className="nav_holder">
        <section className="logo-x-crumbs">
          <Link href="/">
            <TextTag no_white_space color_type="grayed" cursor="pointer">
              R-Cloud
            </TextTag>
          </Link>

          <BreadCrumbs />
        </section>

        <NavTitle />

        <ProfileSection />
      </section>
    </StyledNavBar>
  );
}
