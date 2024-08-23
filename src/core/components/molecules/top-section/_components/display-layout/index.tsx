"use client";

import type { DisplayLayout as DisplayLayoutType } from "@/core/interfaces/app";

import { useEffect, useLayoutEffect } from "react";
import { DivCard } from "@/components/atoms";
import { useAppStore } from "@/providers/stores/zustand";
import { CLIENT_STORAGE } from "@/core/lib";
import { cn } from "@/core/lib/utils";
import { LayoutGrid, List } from "lucide-react";

interface Props {
  //
};

const localStorage = new CLIENT_STORAGE("local");

export default function DisplayLayout({}: Props) {
  const { displayLayout, setDisplayLayout } = useAppStore();

  useLayoutEffect(() => {
    const layout_type = localStorage.get<DisplayLayoutType>("layout_type", {
      isString: true,
    });

    if (["GRID", "LIST"].includes(layout_type)) {
      if (layout_type === displayLayout) return;

      setDisplayLayout(layout_type);
      return;
    }
  }, []);

  useEffect(() => {
    const layout_type = localStorage.get<DisplayLayoutType>("layout_type", {
      isString: true,
    });

    if (["GRID", "LIST"].includes(layout_type) && layout_type === displayLayout)
      return;

    localStorage.save("layout_type", displayLayout);
  }, [displayLayout]);

  return (
    <DivCard className="rounded-[10px] border border-app_border font-bold">
      <LayoutGrid
        size={35}
        className={cn(
          "cursor-pointer rounded-[7px_0_0_7px] p-[4px_5px]",
          displayLayout === "GRID"
            ? "border border-app_blue bg-app_blue text-app_text_invert shadow"
            : "bg-transparent"
        )}
        onClick={() => setDisplayLayout("GRID")}
      />

      <List
        size={35}
        className={cn(
          "cursor-pointer rounded-[0_7px_7px_0] p-[4px_5px]",
          displayLayout === "LIST"
            ? "border border-app_blue bg-app_blue text-app_text_invert shadow"
            : "bg-transparent"
        )}
        onClick={() => setDisplayLayout("LIST")}
      />
    </DivCard>
  );
}
