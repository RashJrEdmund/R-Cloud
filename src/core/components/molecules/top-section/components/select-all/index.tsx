"use client";

import type { LegacyRef } from "react";

import { useDocStore, useSelectionStore } from "@/providers/stores/zustand";
import { ChevronDown } from "lucide-react";
import { ChangeEventHandler, useEffect, useRef } from "react";
import { Tooltip } from "@/components/ui/tooltip";

export default function SelectAll() {
  const { selectionStart, setSelectionStart, setSelectedDocs } =
    useSelectionStore();
  const { documents, loadingCurrentFolder } = useDocStore();

  const handleSelection: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked: shouldCheck },
  }) => {
    if (shouldCheck) {
      setSelectedDocs(documents);
      setSelectionStart(true);
    } else {
      setSelectionStart(false);
      setSelectedDocs([]);
    }
  };

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!selectionStart && inputRef.current?.checked)
      inputRef.current!.checked = false;
  }, [selectionStart]);

  return loadingCurrentFolder || !documents.length ? null : (
    <Tooltip title="select all">
      <label
        htmlFor="select-all"
        className="flex cursor-pointer flex-nowrap items-center justify-center gap-2"
      >
        <input
          ref={inputRef as LegacyRef<HTMLInputElement>}
          id="select-all"
          type="checkbox"
          placeholder="select all"
          className="cursor-pointer"
          onChange={handleSelection}
        />

        <ChevronDown size={15} />
      </label>
    </Tooltip>
  );
}
