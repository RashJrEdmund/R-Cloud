"use client";

import { useLayoutEffect } from "react";
import { useAppStore } from "@/providers/stores/zustand";
import { CLIENT_STORAGE } from "@orashus/client-storage";
import { Columns3 } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { ColumnSeparation } from "@/core/interfaces/app";

const localStorage = new CLIENT_STORAGE("local");

export default function Columns() {
  const { columnSeparation, setColumnSeparation } = useAppStore();

  const toggleColumnSeparation = () => {
    const saveToStorage = (val: ColumnSeparation) => {
      localStorage.save("column_separation", val);
    };

    setColumnSeparation(
      (() => {
        switch (columnSeparation) {
          case "ON":
            saveToStorage("OFF");
            return "OFF";
          case "OFF":
            saveToStorage("ON");
            return "ON";
          default:
            return "OFF";
        }
      })()
    );
  };

  useLayoutEffect(() => {
    const column_separation = localStorage.get<ColumnSeparation>(
      "column_separation"
    )! as ColumnSeparation;

    if (["ON", "OFF"].includes(column_separation)) {
      if (column_separation === columnSeparation) return;

      setColumnSeparation(column_separation);
      return;
    }
  }, []);

  return (
    <Columns3
      onClick={toggleColumnSeparation}
      className={cn(
        "cursor-pointer transition-transform duration-300",
        columnSeparation === "ON" ? "rotate-180 text-app_blue" : ""
      )}
    />
  );
}
