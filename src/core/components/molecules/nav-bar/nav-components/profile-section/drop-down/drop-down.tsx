"use client";

import { DivCard } from "@/components/atoms";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { shortenText } from "@/core/utils/helpers";
import { useUserStore } from "@/providers/stores/zustand";
import {
  Blend,
  FolderRoot,
  Gauge,
  HardDrive,
  LayoutDashboard,
  LogOut,
  LogIn,
  Stamp,
  User,
  Signpost,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  //
}

export default function ProfileDropDown({}: Props) {
  const { currentUser, userProfile, setLogOutDialogOpen } = useUserStore();

  const DROP_DOWN_CONTENT_1 = useMemo(() => {
    const data = [
      {
        href: "/r-drive",
        text: "R - Drive",
        icon: HardDrive,
      },
      {
        href: "/r-drive/root",
        text: "Root",
        icon: FolderRoot,
      },
      {
        href: "/profile",
        text: "My Profile",
        icon: User,
      },
      {
        href: "/shared/me",
        text: "Shared With Me",
        icon: Blend,
      },
      {
        href: "/storage-plans",
        text: "Storage Plans",
        icon: Stamp,
      },
      {
        href: "/video-guides",
        text: "Video Guides",
        icon: Signpost,
      },
    ];

    if (userProfile && ["ADMIN", "SUPER_ADMIN"].includes(userProfile.role)) {
      const _data = [...data];

      _data.splice(3, 0, {
        href: "/dashboard",
        text: "Dashboard",
        icon: LayoutDashboard || Gauge,
      });

      return _data;
    }

    return data;
  }, [userProfile]);

  const DROP_DOWN_CONTENT_2 = useMemo(
    () => [
      {
        action: () => setLogOutDialogOpen(true),
        text: "Log Out",
        icon: LogOut,
      },
    ],
    []
  );

  // NO USER CONTENT

  const NO_USER_DROP_DOWN_CONTENT_1 = useMemo(
    () => [
      {
        href: "/storage-plans",
        text: "Storage Plans",
        icon: Stamp,
      },
      {
        href: "/video-guides",
        text: "Video Guides",
        icon: Signpost,
      },
    ],
    []
  );

  const NO_USER_DROP_DOWN_CONTENT_2 = useMemo(
    () => [
      {
        href: "/login",
        text: "Log in",
        icon: LogIn,
      },
    ],
    []
  );

  return (
    <DivCard className="min-w-[200px] flex-col items-start gap-1 rounded-[8px] bg-app_white p-[10px] sm:min-w-[220px]">
      <DropdownMenuLabel>
        {shortenText(currentUser?.username || "username", 26)}
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="w-full bg-app_bg_light" />

      {(function () {
        if (currentUser) {
          return DROP_DOWN_CONTENT_1.map(({ text, href, icon: Icon }) => (
            <DropdownMenuItem key={text} asChild>
              <Link
                href={href}
                className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
              >
                <Icon size={20} /> {text}
              </Link>
            </DropdownMenuItem>
          ));
        }

        return NO_USER_DROP_DOWN_CONTENT_1.map(({ text, href, icon: Icon }) => (
          <DropdownMenuItem key={text} asChild>
            <Link
              href={href}
              className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
            >
              <Icon size={20} /> {text}
            </Link>
          </DropdownMenuItem>
        ));
      })()}

      <DropdownMenuSeparator className="w-full bg-app_bg_light" />

      {(function () {
        if (currentUser) {
          return DROP_DOWN_CONTENT_2.map(({ text, action, icon: Icon }) => (
            <DropdownMenuItem
              key={text}
              className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
              onClick={action}
            >
              <Icon size={20} /> {text}
            </DropdownMenuItem>
          ));
        }

        return NO_USER_DROP_DOWN_CONTENT_2.map(({ href, icon: Icon, text }) => (
          <DropdownMenuItem key={text} asChild>
            <Link
              href={href}
              className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
            >
              <Icon size={20} /> {text}
            </Link>
          </DropdownMenuItem>
        ));
      })()}
    </DivCard>
  );
}
