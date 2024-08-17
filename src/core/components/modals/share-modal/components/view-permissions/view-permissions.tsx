"use client";
import { DivCard, TextTag } from "@/components/atoms";
import { useShareModalAssets, useShareModalStore } from "@/providers/stores/zustand";
import { ChevronDown, ShieldCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  // onRestrictionChange: () => void;
};

export default function ViewPermissions({ }: Props) {
  const { Access, ViewerRoles } = useShareModalAssets;

  const {
    access, setAccess,
    viewerRole, setViewerRole,
  } = useShareModalStore();

  return (
    <DivCard className="w-full flex-col items-start justify-start gap-2 sm:flex-row">
      <DivCard className="w-full items-start justify-start gap-2">
        <DivCard className="size-7 rounded-full bg-app_bg_light">
          <access.icon size={20} />
        </DivCard>

        <DivCard className="flex-col items-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <TextTag className="justify-between text-sm font-semibold">
                {access.label} <ChevronDown size={17} />
              </TextTag>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <TextTag className="text-sm font-semibold">Audience</TextTag>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {Access.map((a) => (
                <DropdownMenuItem
                  key={a.label}
                  onClick={() => setAccess(a)}
                  className="min-w-[100px] text-sm"
                >
                  <a.icon size={15} className="mr-1" /> {a.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TextTag className="text-sm text-app_text_grayed">
            {`${access.desc} ${viewerRole.desc}`}
          </TextTag>
        </DivCard>
      </DivCard>

      <DivCard className="w-full items-start justify-start gap-2">
        <DivCard className="size-7 rounded-full bg-app_bg_light text-app_text_grayed">
          <ShieldCheck size={20} />
        </DivCard>

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <TextTag className="justify-between text-sm font-semibold">
              {viewerRole.label} <ChevronDown size={17} />
            </TextTag>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <TextTag className="text-sm font-semibold">Roles</TextTag>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {ViewerRoles.map((r) => (
              <DropdownMenuItem
                key={r.label}
                onClick={() => setViewerRole(r)}
                className="min-w-[100px] text-sm"
              >
                {r.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </DivCard>
    </DivCard>
  );
}
