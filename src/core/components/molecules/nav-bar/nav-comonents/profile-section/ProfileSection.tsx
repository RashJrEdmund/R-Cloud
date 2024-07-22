"use client";

import Image from "next/image";
import StyledProfileSection from "./StyledProfileSection";
import Link from "next/link";
import { useUserStore } from "@/providers/stores/zustand";
import { useMemo, useState } from "react";
import { TextTag } from "@/components/atoms";
import { ProfileDropDown } from "./drop-down";

import type { MouseEventHandler } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props { }

export default function ProfileSection({ }: Props) {
  const { currentUser } = useUserStore();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const profile_url = useMemo(() => {
    return currentUser && currentUser.photo_url
      ? currentUser.photo_url
      : "/user_profile_icon.svg";
  }, [currentUser]);

  const openDropDown: MouseEventHandler<HTMLSpanElement> = (e) => {
    setShowDropDown(true);
  };

  return (
    <section className="w-fit flex items-center justify-center [&_a]:w-fit [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:gap-[7px]">
      {
        !currentUser ? (
          <>
            <Link href="/login">
              <Image
                src={profile_url}
                alt="you are currently not logged in"
                width={50}
                height={50}
                draggable={false}
                className="rounded-full w-[38px] h-[38px] object-cover border border-gray-500"
              />
              <TextTag>Login</TextTag>
            </Link>
          </>
        ) : (
          <DropdownMenu onOpenChange={setShowDropDown} open={showDropDown}>
            <DropdownMenuTrigger asChild>
              <TextTag as="a" className="cursor-pointer" onClick={openDropDown}>
                <Image
                  src={profile_url}
                  alt="user profile image icon"
                  width={50}
                  height={50}
                  draggable={false}
                  className="rounded-full w-[38px] h-[38px] object-cover border border-gray-500"
                />
                <TextTag className="hidden md:inline">{currentUser.username}</TextTag>
              </TextTag>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="translate-y-[10px] -translate-x-[5px]">
              <ProfileDropDown
                setShowDropDown={setShowDropDown}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </section>
  );
}
