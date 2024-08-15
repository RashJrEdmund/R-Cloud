"use client";
import type { Document } from "@/core/interfaces/entities";

import { useState } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import { useUserStore } from "@/providers/stores/zustand";
import { useModalContext } from "@/providers/stores/context";
import { ChevronDown, Globe, Lock, ShieldCheck, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";

interface Props {
  // onRestrictionChange: () => void;
}

const Access = [
  {
    label: "Restricted",
    desc: "Permitted users",
    icon: Lock,
    isPublic: false,
  },
  {
    label: "Public",
    desc: "Anyone with the link",
    icon: Globe,
    isPublic: true,
  }
] as const;

const ViewerRoles = [
  {
    label: "Viewer",
    desc: "can only read file",
  },
  {
    label: "Editor",
    desc: "can read & write to file",
  }
]

type AccessType = typeof Access[number];

type ViewerType = typeof ViewerRoles[number];

export default function ViewPermissions({ }: Props) {
  const [access, setAccess] = useState<AccessType>(Access[0]);

  const [viewerRole, setViewerRole] = useState<ViewerType>(ViewerRoles[0]);

  const { shareModalOpen, setShareModalOpen } = useModalContext();

  const { currentUser } = useUserStore();

  // const handleModalClose = (open: boolean) => {
  //   if (!open) {
  //     // meaning trying to close modal
  //     setIsLoading(false);
  //     setShareModalOpen(false);
  //     return;
  //   }

  //   setShareModalOpen(true);
  // };

  return (
    <DivCard className="w-full flex-col sm:flex-row items-start justify-start gap-2">
      <DivCard className="w-full items-start justify-start gap-2">
        <DivCard className="rounded-full bg-app_bg_light size-7">
          <access.icon size={20} />
        </DivCard>

        <DivCard className="flex-col items-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <TextTag className="text-sm font-semibold justify-between">
                {access.label} <ChevronDown size={17} />
              </TextTag>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <TextTag className="text-sm font-semibold">
                  Audience
                </TextTag>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {
                Access.map((a) => (
                  <DropdownMenuItem key={a.label} onClick={() => setAccess(a)} className="min-w-[100px] text-sm">
                    <a.icon size={15} className="mr-1" /> {a.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>

          <TextTag className="text-sm text-app_text_grayed">
            {`${access.desc} ${viewerRole.desc}`}
          </TextTag>
        </DivCard>
      </DivCard>

      <DivCard className="w-full items-start justify-start gap-2">
        <DivCard className="rounded-full bg-app_bg_light size-7">
          <ShieldCheck size={20} />
        </DivCard>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <TextTag className="text-sm font-semibold justify-between">
              {viewerRole.label} <ChevronDown size={17} />
            </TextTag>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <TextTag className="text-sm font-semibold">
                Roles
              </TextTag>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {
              ViewerRoles.map((r) => (
                <DropdownMenuItem key={r.label} onClick={() => setViewerRole(r)} className="min-w-[100px] text-sm">
                  {r.label}
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </DivCard>
    </DivCard>
  );
}