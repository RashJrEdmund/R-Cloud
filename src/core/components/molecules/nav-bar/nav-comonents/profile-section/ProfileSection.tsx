"use client";

import Image from "next/image";
import StyledProfileSection from "./StyledProfileSection";
import Link from "next/link";
import { useUserStore } from "@/providers/stores/zustand";
import { useMemo, useState } from "react";
import { TextTag } from "@/components/atoms";
import { ProfileDropDown } from "./drop-down";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {}

export default function ProfileSection({}: Props) {
  const { currentUser } = useUserStore();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const profile_url = useMemo(() => {
    return currentUser && currentUser.photo_url
      ? currentUser.photo_url
      : "/user_profile_icon.svg";
  }, [currentUser]);

  return (
    <div className="flex w-fit items-center justify-center [&_a]:flex [&_a]:w-fit [&_a]:items-center [&_a]:justify-center [&_a]:gap-[7px]">
      {!currentUser ? (
        <>
          <Link href="/login">
            <Image
              src={profile_url}
              alt="you are currently not logged in"
              width={50}
              height={50}
              draggable={false}
              className="h-[38px] w-[38px] rounded-full border border-gray-500 object-cover"
            />
            <TextTag>Login</TextTag>
          </Link>
        </>
      ) : (
        <DropdownMenu onOpenChange={setShowDropDown} open={showDropDown}>
          <DropdownMenuTrigger className="outline-none">
            <TextTag>
              <Image
                src={profile_url}
                alt="user profile image icon"
                width={50}
                height={50}
                draggable={false}
                className="h-[38px] w-[38px] rounded-full border border-gray-500 object-cover"
              />
              <TextTag className="hidden md:inline">
                {currentUser?.username}
              </TextTag>
            </TextTag>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="-translate-x-[5px] translate-y-[10px]">
            <ProfileDropDown setShowDropDown={setShowDropDown} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
