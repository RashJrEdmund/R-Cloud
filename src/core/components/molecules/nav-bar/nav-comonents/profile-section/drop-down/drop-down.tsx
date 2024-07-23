"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logOut } from "@/core/config/firebase";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileDropDown({ setShowDropDown }: Props) {
  const { setCurrentUser } = useUserStore();
  const { setDocuments } = useDocStore();
  const router = useRouter();

  const handleLogOut = () => {
    logOut().then(() => {
      setCurrentUser(null);
      setDocuments(null);
      router.replace("/");
    });
  };

  const DROP_DOWN_CONTENT = useMemo(() => {
    return [
      {
        action: () => router.push("/r-drive"),
        text: "R - Drive",
      },
      {
        action: () => router.push("/r-drive/root"),
        text: "Root",
      },
      {
        action: () => router.push("/profile"),
        text: "My Profile",
      },
      {
        action: () => router.push("/storage-plans"),
        text: "Storage Plans",
      },
      {
        action: handleLogOut,
        text: "Log Out",
      },
    ];
  }, [router]);

  return (
    <DivCard className="min-w-[150px] flex-col items-start gap-4 rounded-[8px] bg-app_white p-[1rem_1rem_10px_10px]">
      {DROP_DOWN_CONTENT.map(({ text, action }) => (
        <TextTag
          key={text}
          className="cursor-pointer whitespace-nowrap"
          onClick={() => {
            action();
            setShowDropDown(false);
          }}
        >
          {text}
        </TextTag>
      ))}
    </DivCard>
  );
}
