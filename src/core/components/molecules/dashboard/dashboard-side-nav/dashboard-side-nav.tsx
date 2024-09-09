"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, Map, Users, X } from "lucide-react";

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
          "h-screen w-full flex-col justify-between overflow-y-auto bg-app_white p-4 shadow sm:max-w-[350px]",
          "fixed left-0 top-0 z-20 transition-transform duration-300",
          sideBarOpen ? "translate-x-0" : "translate-x-[-110%] sm:translate-x-0"
        )}
      >
        <DivCard className="w-full flex-col gap-3">
          <DivCard className="mb-8 w-full justify-between gap-4">
            <Link
              href="/"
              className={cn(
                "w-fit cursor-pointer",
                sideBarOpen ? "mx-0 sm:mx-auto" : "sm:mx-auto"
              )}
            >
              <Image
                src="/icons/r-cloud-logo.svg"
                width={50}
                height={50}
                alt="r-cloud logo"
                className="size-14 md:size-20"
              />
            </Link>

            <X size={30} className="sm:hidden" onClick={closeSideNav} />
          </DivCard>

          {SideNavContent.map(({ text, path, icon: Icon }) => {
            const shouldHighlight = path === pathname;

            return (
              <Link
                key={text}
                href={path}
                onClick={closeSideNav}
                className={cn(
                  shouldHighlight ? "bg-app_black" : "",
                  "w-full rounded-lg border p-3 duration-300 hover:shadow hover:shadow-app_blue"
                )}
              >
                <TextTag
                  className={cn(
                    "w-full justify-between",
                    shouldHighlight ? "text-app_text_invert" : ""
                  )}
                >
                  {text}

                  <Icon />
                </TextTag>
              </Link>
            );
          })}
        </DivCard>

        <Button asChild variant={"black"}>
          <TextTag
            className="w-full cursor-pointer justify-between rounded-lg border p-3 py-[1.3rem] text-base duration-300"
            onClick={() => {
              closeSideNav();
              setLogOutDialogOpen(true);
            }}
          >
            Logout
            <LogOut />
          </TextTag>
        </Button>
      </DivCard>
    </>
  );
}
