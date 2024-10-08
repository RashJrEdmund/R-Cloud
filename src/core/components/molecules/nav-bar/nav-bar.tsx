import { TextLogo } from "@/components/atoms";
import { BreadCrumbs, ProfileSection } from "./nav-components";
import Link from "next/link";

interface Props {}

export default function NavBar({}: Props) {
  return (
    <nav className="fixed left-0 top-0 z-[7] h-fit w-full bg-app_white shadow-sm">
      <section className="relative mx-auto flex w-primary_app_w items-center justify-between py-[10px]">
        <section className="flex items-center justify-center">
          <Link href="/" className="w-fit">
            <TextLogo showLogo />
          </Link>

          <BreadCrumbs />
        </section>

        <ProfileSection />
      </section>
    </nav>
  );
}
