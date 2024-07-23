"use client";

import { TextLogo } from "@/components/atoms";
import { BreadCrumbs, NavTitle, ProfileSection } from "./nav-comonents";
import Link from "next/link";

interface Props {}

export default function NavBar({}: Props) {
  return (
    <nav className="fixed left-0 top-0 z-[7] h-fit w-full bg-app_white">
      <section className="relative mx-auto flex w-primary_app_width items-center justify-between p-[10px_1rem]">
        <section className="flex items-center justify-center">
          <Link href="/" className="w-fit">
            <TextLogo showLogo sxTextClassName="hidden sm:inline" />
          </Link>

          <BreadCrumbs />
        </section>

        {/* <NavTitle /> */}

        <ProfileSection />
      </section>
    </nav>
  );
}
