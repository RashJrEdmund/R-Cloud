"use client";

import Image from "next/image";
import StyledProfileSection from "./StyledProfileSection";
import Link from "next/link";
import { useUserStore } from "@/providers/stores/zustand";
import { useMemo, useState } from "react";
import { TextTag } from "@/components/atoms";
import { ProfileDropDown } from "./drop-down";
import { getResponsiveMenuPosition } from "@/core/utils/helpers";

import type { MouseEventHandler } from "react";

interface Props {}

export default function ProfileSection({}: Props) {
  const { currentUser } = useUserStore();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ top: string; left: string }>(
    { top: "calc(100% + 1rem)", left: "0" }
  );

  const profile_url = useMemo(() => {
    return currentUser && currentUser.photo_url
      ? currentUser.photo_url
      : "/user_profile_icon.svg";
  }, [currentUser]);

  const openDropDown: MouseEventHandler<HTMLSpanElement> = (e) => {
    setShowDropDown(true);

    const xyCoord = getResponsiveMenuPosition(e as any as MouseEvent, {
      width: 150,
    }); // 150 px is min_width of drop-down component

    setCoordinates((prev) => ({
      ...prev,
      left: (-1 * xyCoord.extra_x || 10) + "px",
    }));
  };

  return !currentUser ? (
    <StyledProfileSection title="you are currently not logged in">
      <Link href="/login">
        <Image
          src={profile_url}
          alt="you are currently not logged in"
          width={50}
          height={50}
          draggable={false}
        />
        <TextTag>Login</TextTag>
      </Link>
    </StyledProfileSection>
  ) : (
    <StyledProfileSection title={`logged in as ${currentUser.username}`}>
      <TextTag as="a" cursor="pointer" onClick={openDropDown}>
        <Image
          src={profile_url}
          alt="user profile image icon"
          width={50}
          height={50}
          draggable={false}
        />
        <TextTag className="user-name">{currentUser.username}</TextTag>
      </TextTag>

      <ProfileDropDown
        coordinates={coordinates}
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
      />
    </StyledProfileSection>
  );
}
