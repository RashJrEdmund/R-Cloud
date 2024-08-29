"use client";

import { DivCard } from "@/components/atoms";
import { ProfileSection } from "../../nav-bar/nav-components";

export default function DashboardTopNav() {
  return (
    <DivCard className="w-full shadow">
      <DivCard className="w-full max-w-default_app_max_w justify-end py-3 sm:px-4">

        <ProfileSection />
      </DivCard>

    </DivCard>
  );
};
