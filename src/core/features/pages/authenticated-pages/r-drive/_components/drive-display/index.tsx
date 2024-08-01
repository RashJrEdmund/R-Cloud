"use client";

import { useEffect } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { UsedSpaceDisplay } from "@/components/molecules";
import Link from "next/link";
import Image from "next/image";
import {
  getTotalUsedSize,
  getUserProfile,
} from "@/core/config/firebase/fire-store";
import { useUserStore } from "@/providers/stores/zustand";

interface Props {}

export default function DriveDisplay({}: Props) {
  const { currentUser, userProfile, setUserProfile } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;

    getUserProfile(currentUser.email)
      .then((res) => {
        if (!res.exists()) return;
        setUserProfile(res.data());
      })
      .finally(() => {});

    // getTotalUsedSize(currentUser?.email || '').then((res) => {
    //   console.log(res);
    //   console.log('data', res.data());
    // });
  }, [currentUser, setUserProfile]);

  return (
    <DivCard className="w-full flex-col gap-4">
      <DivCard className="w-full flex-col gap-4">
        <UsedSpaceDisplay userProfile={userProfile} className="" />

        <Button asChild variant="blued">
          <Link href="/r-drive/root">Open Drive</Link>
        </Button>
      </DivCard>

      <Image
        src="/landing/my-r-drive.svg"
        alt="my-r-drive"
        width={500}
        height={500}
        draggable={false}
      />
    </DivCard>
  );
}
