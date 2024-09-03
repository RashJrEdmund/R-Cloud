"use client";

import { DivCard, TextLogo } from "@/components/atoms";
import { ProfileSection } from "../../nav-bar/nav-components";
import { BellDot, Menu } from "lucide-react";
import { useDashboardStore } from "@/providers/stores/zustand";

export default function DashboardTopNav() {
  const { setSideBarOpen } = useDashboardStore();

  return (
    <DivCard className="fixed left-0 top-0 z-10 w-full bg-app_white shadow">
      <DivCard className="w-full max-w-default_app_max_w justify-between py-[10px] sm:px-4">
        <DivCard onClick={() => setSideBarOpen(true)}>
          <Menu
            size={32}
            className="cursor-pointer bg-app_white shadow-sm shadow-app_blue sm:hidden"
          />
          <TextLogo className="ml-2" />
        </DivCard>

        <DivCard className="w-full justify-end gap-4">
          <BellDot className="cursor-pointer text-app_blue" />

          <ProfileSection />
        </DivCard>
      </DivCard>
    </DivCard>
  );
}
