"use client";

import { DivCard } from "@/components/atoms";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  Users} from "lucide-react";

import { useState } from "react";
import { useUserStore } from "@/providers/stores/zustand";

const TopNavContent = [
  { text: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { text: "Users", path: "/dashboard/users", icon: Users },
  { text: "Storage Plans", path: "/dashboard/storage-plans", icon: Map },
];

export default function DashboardTopNav() {
  const [open, setOpen] = useState<boolean>(true);
  const { currentUser, userProfile } = useUserStore();

  return (
    <DivCard className="w-full shadow">
      <DivCard className="w-full max-w-default_app_max_w justify-end py-3 sm:px-4">
        {/* nav items */}

        <Link href="/profile">
          <Image
            src={currentUser?.photo_url || "/auth-image/default-profile-photo.jpg"}
            alt="user profile image icon"
            width={50}
            height={50}
            draggable={false}
            className="size-[35px] rounded-full border border-gray-500 object-cover md:size-[38px]"
          />
        </Link>
      </DivCard>
    </DivCard>
  );
};
