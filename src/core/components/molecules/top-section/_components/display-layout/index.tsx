"use client";

import { useEffect, useLayoutEffect } from "react";
import { DivCard } from "@/components/atoms";
import { useAppStore } from "@/providers/stores/zustand";
import Image from "next/image";
import { CLIENT_STORAGE } from "@/core/lib";
import type { DisplayLayout } from "@/core/interfaces/app";
import { cn } from "@/core/lib/utils";

interface Props {
  //
}

export default function DisplayLayout({}: Props) {
  const { displayLayout, setDisplayLayout } = useAppStore();

  useLayoutEffect(() => {
    const localStorage = new CLIENT_STORAGE("local");

    const layout_type = localStorage.get<DisplayLayout>("layout_type", {
      isString: true,
    });

    if (["GRID", "LIST"].includes(layout_type)) {
      if (layout_type === displayLayout) return;

      setDisplayLayout(layout_type);
      return;
    }
  }, []);

  useEffect(() => {
    const localStorage = new CLIENT_STORAGE("local");

    const layout_type = localStorage.get<DisplayLayout>("layout_type", {
      isString: true,
    });

    if (["GRID", "LIST"].includes(layout_type) && layout_type === displayLayout)
      return;

    localStorage.save("layout_type", displayLayout, { isString: true });
  }, [displayLayout]);

  return (
    <DivCard className="rounded-[10px] border border-app_border">
      <DivCard
        className={cn(
          "cursor-pointer rounded-[8px_0_0_8px] p-[4px_5px]",
          displayLayout === "GRID" ? "bg-app_bg_grayed" : "bg-transparent"
        )}
      >
        <Image
          src="/icons/display-layout-grid.svg"
          alt="display-layout-grid"
          height={25}
          width={25}
          draggable={false}
          style={{
            color: "red",
          }}
          onClick={() => setDisplayLayout("GRID")}
        />
      </DivCard>

      <DivCard
        className={cn(
          "cursor-pointer rounded-[0_8px_8px_0] p-[4px_5px]",
          displayLayout === "LIST" ? "bg-app_bg_grayed" : "bg-transparent"
        )}
      >
        <Image
          src="/icons/display-layout-list.svg"
          alt="display-layout-list"
          height={25}
          width={25}
          draggable={false}
          onClick={() => setDisplayLayout("LIST")}
        />
      </DivCard>
    </DivCard>
  );
}
