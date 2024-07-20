"use client";
import { TextLogo, TextTag } from "@/components/atoms";

import {
  BreadCrumbs,
  NavTitle,
  ProfileSection,
  StyledNavBar,
} from "./nav-comonents";
import Link from "next/link";

interface Props { }

export default function NavBar({ }: Props) {
  return (
    <nav className="bg-app_white fixed top-0 left-0 w-full h-fit z-[7]">
      <section className="relative w-primary_app_width mx-auto p-[10px_1rem] flex items-center justify-between">
        <section className="flex items-center justify-center">
          <Link href="/" className="w-fit">
            <TextLogo
              showLogo
              sxTextClassName="hidden sm:inline"
            />
          </Link>

          <BreadCrumbs />
        </section>

        <NavTitle />

        <ProfileSection />
      </section>
    </nav>
  );
}
