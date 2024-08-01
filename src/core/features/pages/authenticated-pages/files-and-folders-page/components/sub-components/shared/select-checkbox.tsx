"use client";

import type { Document } from "@/core/interfaces/entities";

import { THEME_PALETTE } from "@/core/ui/theme";
import { Overlay } from "@/components/atoms";
import { useEffect, useState } from "react";

import { useSelectionStore } from "@/providers/stores/zustand";
import { cn } from "@/core/lib/utils";

const {} = THEME_PALETTE;

interface Props {
  document: Document;
  className?: string;
}

export default function SelectCheckbox({ document, className }: Props) {
  const [checked, setChecked] = useState<boolean>(false);

  const { selectionStart, selectedDocs, handleDocumentSelection } =
    useSelectionStore();

  const handleSelection = () => {
    handleDocumentSelection(document);
  };

  useEffect(() => {
    if (selectedDocs.find((doc) => doc.id === document?.id)) setChecked(true);
    else setChecked(false);
  }, [document, selectedDocs]);

  return selectionStart ? (
    <>
      <Overlay
        isOpen
        className="absolute z-[3] cursor-pointer bg-transparent"
        onClick={handleSelection}
      />

      <input
        className={cn("left-0 top-0 z-[5] cursor-pointer", className)}
        type="checkbox"
        title="toggle display layout"
        checked={checked}
        onClick={handleSelection}
      />
    </>
  ) : null;
}
