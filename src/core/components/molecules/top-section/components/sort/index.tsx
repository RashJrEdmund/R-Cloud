"use client";

import { useLayoutEffect } from "react";
import { useAppStore } from "@/providers/stores/zustand";
import { CLIENT_STORAGE } from "@orashus/client-storage";
import { TableColumnsSplit } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { FolderSeparation } from "@/core/interfaces/app";

interface Props {
  //
}

const localStorage = new CLIENT_STORAGE("local");

export default function Sort({}: Props) {
  const { folderSeparation, setFolderSeparation } = useAppStore();

  const toggleFolderSeparation = () => {
    const saveToStorage = (val: FolderSeparation) => {
      localStorage.save("separate_folders", val);
    };

    setFolderSeparation(
      (() => {
        switch (folderSeparation) {
          case "NONE":
            saveToStorage("LOW");
            return "LOW";
          case "LOW":
            saveToStorage("FULL");
            return "FULL";
          case "FULL":
            saveToStorage("NONE");
            return "NONE";
          default:
            return "NONE";
        }
      })()
    );
  };

  useLayoutEffect(() => {
    const separate_folders = localStorage.get<FolderSeparation>("separate_folders")! as FolderSeparation;

    if (["NONE", "LOW", "FULL"].includes(separate_folders)) {
      if (separate_folders === folderSeparation) return;

      setFolderSeparation(separate_folders);
      return;
    }
  }, []);

  return (
    <>
      <TableColumnsSplit
        onClick={toggleFolderSeparation}
        className={cn(
          "cursor-pointer transition-transform duration-300",
          ["LOW", "FULL"].includes(folderSeparation) ? "text-app_blue" : "",
          folderSeparation === "FULL" ? "rotate-90" : ""
        )}
      />
    </>
  );
}
