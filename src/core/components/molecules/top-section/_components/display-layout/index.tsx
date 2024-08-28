"use client";

import type { DisplayLayout as DisplayLayoutType } from "@/core/interfaces/app";

import { useLayoutEffect } from "react";
import { DivCard } from "@/components/atoms";
import { useAppStore } from "@/providers/stores/zustand";
import { CLIENT_STORAGE } from "@/core/lib";
import { cn } from "@/core/lib/utils";
import { LayoutGrid, List } from "lucide-react";

interface Props {
  //
};

const localStorage = new CLIENT_STORAGE("local");

export default function DisplayLayout({ }: Props) {
  const { displayLayout, setDisplayLayout } = useAppStore();

  const toggleDisplayLayout = (layout: DisplayLayoutType) => {
    const saveToStorage = (val: DisplayLayoutType) => {
      localStorage.save("layout_type", val);
    };

    setDisplayLayout((() => {
      switch (layout) {
        case "GRID":
          saveToStorage("GRID");
          return "GRID";
        case "LIST":
          saveToStorage("LIST");
          return "LIST";
        default:
          return "GRID";
      }
    })());
  }

  useLayoutEffect(() => {
    const layout_type = localStorage.get<DisplayLayoutType>("layout_type", {
      isString: true,
    })!;

    if (["GRID", "LIST"].includes(layout_type)) {
      if (layout_type === displayLayout) return;

      setDisplayLayout(layout_type);
      return;
    }
  }, []);

  return (
    <DivCard className="rounded-[10px] border border-app_border font-bold">
      {/* <LayoutGrid
        size={35}
        className={cn(
          "cursor-pointer rounded-[7px_0_0_7px] p-[4px_5px]",
          displayLayout === "GRID"
            ? "border border-app_blue bg-app_blue text-app_text_invert shadow"
            : "bg-transparent"
        )}
        onClick={() => toggleDisplayLayout("GRID")}
      /> */}

      {/* <List
        size={35}
        className={cn(
          "cursor-pointer rounded-[0_7px_7px_0] p-[4px_5px]",
          displayLayout === "LIST"
            ? "border border-app_blue bg-app_blue text-app_text_invert shadow"
            : "bg-transparent"
        )}
        onClick={() => toggleDisplayLayout("LIST")}
      /> */}

      {
        [
          {
            icon: LayoutGrid,
            layout_type: "GRID" as DisplayLayoutType,
          },
          {
            icon: List,
            layout_type: "LIST" as DisplayLayoutType,
          },
        ].map(({ icon: Icon, layout_type }) => (
          <Icon
            key={layout_type}
            size={35}
            className={cn(
              "cursor-pointer p-[4px_5px]",
              layout_type === "GRID" ? "rounded-[7px_0_0_7px]" : "rounded-[0_7px_7px_0]",
              displayLayout === layout_type
                ? "border border-app_blue bg-app_blue text-app_text_invert shadow"
                : "bg-transparent"
            )}
            onClick={() => toggleDisplayLayout(layout_type as DisplayLayoutType)}
          />
        ))
      }

    </DivCard>
  );
}
