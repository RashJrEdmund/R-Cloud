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
import { useEffect, useMemo } from "react";

interface Props {
  //
};

export default function ViewPermissions({ }: Props) {
  const { Access, Viewers } = useShareModalAssets;

  const {
    fileToBeShared,
    accessType, setAccessType,
    viewerRole, setViewerRole,

    setUserEmails,
  } = useShareModalStore();

  const selectedAccess = useMemo(() => {
    return Access.find(({ type }) => type === accessType)!;
  }, [accessType, Access]);

  const selectedRole = useMemo(() => {
    return Viewers.find(({ type }) => type === viewerRole)!;
  }, [viewerRole, Viewers]);

  useEffect(() => {
    // setting defaults
    setUserEmails(fileToBeShared!?.sharedState?.sharedWith || []);
    setAccessType(fileToBeShared!.sharedState?.accessType || "RESTRICTED");
    setViewerRole(fileToBeShared!.sharedState?.viewerRole || "VIEWER");
  }, []);

  return (
    <DivCard className="w-full flex-col items-start justify-start gap-2 sm:flex-row">
      <DivCard className="w-full items-start justify-start gap-2">
        <DivCard className="size-7 rounded-full bg-app_bg_light text-app_text_grayed">
          <selectedAccess.icon size={20} />
        </DivCard>

        <DivCard className="flex-col items-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <TextTag className="justify-between text-sm font-semibold">
                {selectedAccess.label}

                <ChevronDown size={17} />
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
                  onClick={() => setAccessType(a.type)}
                  className="min-w-[100px] text-sm"
                >
                  <a.icon size={15} className="mr-1" /> {a.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TextTag className="text-sm text-app_text_grayed">
            {`${selectedAccess.desc} ${selectedRole.desc}`}
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
              {selectedRole.label} <ChevronDown size={17} />
            </TextTag>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <TextTag className="text-sm font-semibold">Roles</TextTag>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {Viewers.map((r) => (
              <DropdownMenuItem
                key={r.label}
                onClick={() => setViewerRole(r.type)}
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
};
