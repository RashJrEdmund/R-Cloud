"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Map,
  Users,
  X
} from "lucide-react";

import { useDashboardStore, useUserStore } from "@/providers/stores/zustand";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const SideNavContent = [
  { text: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { text: "Users", path: "/dashboard/users", icon: Users },
  { text: "Storage Plans", path: "/dashboard/storage-plans", icon: Map },
];

export default function DashboardSideNav() {
  const { sideBarOpen, setSideBarOpen } = useDashboardStore();
  const { setLogOutDialogOpen } = useUserStore();

  const pathname = usePathname();

  const closeSideNav = () => {
    setSideBarOpen(false);
  };

  return (
    <>
      <DivCard className="hidden w-full sm:flex sm:max-w-[350px]" />

      <DivCard
        as="nav"
        className={cn(
          "w-full sm:max-w-[350px] h-screen flex-col justify-between overflow-y-auto bg-app_white p-4 shadow",
          "fixed top-0 left-0 z-20 transition-transform duration-300",
          sideBarOpen ? "translate-x-0" : "translate-x-[-110%] sm:translate-x-0"
        )}
      >
        <DivCard className="w-full flex-col gap-3">
          <DivCard className="w-full gap-4 justify-between mb-8">
            <Link href="/" className={cn("cursor-pointer w-fit", sideBarOpen ? "mx-0 sm:mx-auto" : "sm:mx-auto")}>
              <Image
                src="/icons/r-cloud-logo.svg"
                width={50}
                height={50}
                alt="r-cloud logo"
                className="size-14 md:size-20"
              />
            </Link>

            <X
              size={30}
              className="sm:hidden"
              onClick={closeSideNav}
            />
          </DivCard>

          {
            SideNavContent.map(({ text, path, icon: Icon }) => (
              <Link
                key={text}
                href={path}
                onClick={closeSideNav}
                className={cn(path === pathname ? "bg-slate-400" : "", "w-full p-3 border rounded-lg duration-300 hover:shadow hover:shadow-app_blue")}
              >
                <TextTag
                  className="w-full justify-between"
                >
                  {text}

                  <Icon />
                </TextTag>
              </Link>
            ))
          }
        </DivCard>

        <Button asChild>
          <TextTag
            className="border w-full p-3 cursor-pointer justify-between rounded-lg py-5 duration-300 text-base"
            onClick={() => { closeSideNav(); setLogOutDialogOpen(true); }}
          >
            Logout
            <LogOut />
          </TextTag>
        </Button>
      </DivCard>
    </>
  );
};
