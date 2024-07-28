"use client";

"use client";

import styled from "@emotion/styled";
import { THEME_PALETTE } from "@/core/ui/theme";
import { useAppStore } from "@/providers/stores/zustand";
import { Overlay } from "@/components/atoms";
import { useEffect, useState } from "react";

import type { Document } from "@/core/interfaces/entities";
import { useContextMenuStore } from "@/providers/stores/context";

const {} = THEME_PALETTE;

interface _props {
  absolute: boolean;
}

const StyledCheckBox = styled.input<_props>`
  position: ${({ absolute }) =>
    absolute ? "absolute" : "unset"}; // parents have position relative
  margin-right: 5px;
  z-index: 5;
  cursor: pointer;
`;

interface Props {
  document: Document;
}

export default function SelectCheckbox({ document }: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  const { displayLayout } = useAppStore();

  const { selectionStart, selectedDocs, handleDocumentSelection } =
    useContextMenuStore();

  const handleSelection = () => {
    handleDocumentSelection(document);
  };

  useEffect(() => {
    if (selectedDocs.find((doc) => doc.id === document.id)) setChecked(true);
    else setChecked(false);

    // console.clear();
    // console.log(selectedDocs);
  }, [document, selectedDocs]);

  return selectionStart ? (
    <>
      <Overlay
        isOpen
        className="absolute z-[3] cursor-pointer bg-transparent"
        onClick={handleSelection}
      />

      <StyledCheckBox
        absolute={displayLayout === "GRID"}
        type="checkbox"
        checked={checked}
        onClick={handleSelection}
      />
    </>
  ) : null;
}
