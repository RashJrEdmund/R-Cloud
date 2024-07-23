"use client";

import { DivCard, TextTag } from "@/components/atoms";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/core/config/firebase";
import { useDocStore, useUserStore } from "@/providers/stores/zustand";
import { FolderRoot, HardDrive, LogOut, Stamp, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DROP_DOWN_CONTENT_1 = [
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
    href: "/storage-plans",
    text: "Storage Plans",
    icon: Stamp,
  },
];

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

  const DROP_DOWN_CONTENT_2 = useMemo(() => {
    return [
      {
        action: handleLogOut,
        text: "Log Out",
        icon: LogOut,
      },
    ];
  }, [router]);

  return (
    <DivCard className="min-w-[150px] flex-col items-start gap-1 rounded-[8px] bg-app_white p-[1rem_1rem_10px_10px]">
      {DROP_DOWN_CONTENT_1.map(({ text, href, icon: Icon }) => (
        <DropdownMenuItem key={text} asChild>
          <Link
            href={href}
            className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
          >
            <Icon size={20} /> {text}
          </Link>
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator className="w-full bg-app_bg_light" />

      {DROP_DOWN_CONTENT_2.map(({ text, action, icon: Icon }) => (
        <DropdownMenuItem
          key={text}
          className="flex w-full flex-nowrap items-center justify-start gap-[5px] whitespace-nowrap hover:bg-transparent"
          onClick={action}
        >
          <LogOut size={20} /> Log Out
        </DropdownMenuItem>
      ))}
    </DivCard>
  );
}
