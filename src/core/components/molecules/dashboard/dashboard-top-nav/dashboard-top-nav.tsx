"use client";

import { DivCard, TextLogo } from "@/components/atoms";
import { ProfileSection } from "../../nav-bar/nav-components";
import { BellDot, Menu } from "lucide-react";
import { useDashboardStore } from "@/providers/stores/zustand";

export default function DashboardTopNav() {
  const { setSideBarOpen } = useDashboardStore();

  return (
    <DivCard className="fixed top-0 left-0 z-10 w-full bg-app_white shadow">
      <DivCard className="w-full max-w-default_app_max_w justify-between py-[10px] sm:px-4">
        <DivCard onClick={() => setSideBarOpen(true)}>
          <Menu
            size={32}
            className="sm:hidden shadow-sm shadow-app_blue bg-app_white cursor-pointer"
          />
          <TextLogo className="ml-2" />
        </DivCard>

        <DivCard className="w-full justify-end gap-4">
          <BellDot className="text-app_blue cursor-pointer" />

          <ProfileSection />
        </DivCard>
      </DivCard>
    </DivCard>
  );
};
