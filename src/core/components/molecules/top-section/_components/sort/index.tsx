"use client";

import { useEffect, useLayoutEffect } from "react";
import { useAppStore } from "@/providers/stores/zustand";
import { CLIENT_STORAGE } from "@/core/lib";
import { SeparatorHorizontal, TableColumnsSplit, TableRowsSplit } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { FolderSeparation } from "@/core/interfaces/app";

interface Props {
  //
};

const localStorage = new CLIENT_STORAGE("local");

const SEPARATION_SETTINGS: FolderSeparation[] = ["NONE", "LOW", "FULL"];

export default function Sort({ }: Props) {
  const { folderSeparation, setFolderSeparation } = useAppStore();

  const toggleFolderSeparation = () => {
    setFolderSeparation((() => {
      switch (folderSeparation) {
        case "NONE":
          return "LOW";
        case "LOW":
          return "FULL";
        case "FULL":
          return "NONE";
        default:
          return "NONE";
      }
    })());
  }

  useLayoutEffect(() => {
    const separate_folders = localStorage.get<FolderSeparation>("separate_folders", {
      isString: true
    })!;

    if (["NONE", "LOW"].includes(separate_folders)) {
      if (separate_folders === folderSeparation) return;

      setFolderSeparation(separate_folders);
      return;
    }
  }, []);

  useEffect(() => {
    const separate_folders = localStorage.get<FolderSeparation>("separate_folders", {
      isString: true
    })!;

    if (["NONE", "LOW"].includes(separate_folders) && separate_folders === folderSeparation)
      return;

    localStorage.save("separate_folders", folderSeparation);
  }, [folderSeparation]);

  return (
    <>
      <TableColumnsSplit
        onClick={toggleFolderSeparation}
        className={cn(
          "cursor-pointer transition-transform duration-300",
          ["LOW", "FULL"].includes(folderSeparation) ? "text-app_blue" : "",
          folderSeparation === "FULL" ? "rotate-90" : "",
        )}
      />
    </>
  );
}
