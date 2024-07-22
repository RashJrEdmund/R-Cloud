"use client";

import { DivCard, TextField, TextTag } from "@/components/atoms";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, LegacyRef } from "react";

interface Props {
  //
}

export default function Search({}: Props) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchCombo, setSearchCombo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    // handle fetch. use debouncer.
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.clear();
    console.log(e.target.value);
    setSearchVal(e.target.value);
  };

  const handleSearchKeyCombo = (e: KeyboardEvent) => {
    e.preventDefault();

    if ((e.metaKey || e.ctrlKey) && ["k", "K"].includes(e.key)) {
      inputRef?.current?.focus();
      window.removeEventListener("keydown", handleSearchKeyCombo);
    }
  };

  useEffect(() => {
    if (navigator && navigator.platform.toLowerCase().includes("mac")) {
      setSearchCombo("CMD + K");
    } else {
      setSearchCombo("Ctrl + k");
    }

    // window.addEventListener('keydown', handleSearchKeyCombo);

    // return () => {
    //   window.removeEventListener('keydown', handleSearchKeyCombo);
    // };
  }, []);

  return (
    <DivCard as="search" media_sx="display: none;">
      <DivCard
        as="form"
        className="relative w-[min(300px,_97vw)] rounded-[10px] border border-app_border"
        onSubmit={handleSubmit}
      >
        <TextField
          ref={inputRef as LegacyRef<HTMLInputElement>}
          placeholder={"Quick search - " + searchCombo}
          value={searchVal}
          onChange={handleChange}
          className="border-none"
          // onFocus={() => {
          //   window.removeEventListener('keydown', handleSearchKeyCombo);
          // }}
          // onBlur={() => {
          //   window.addEventListener('keydown', handleSearchKeyCombo);
          // }}
        />
        {searchVal ? (
          <DivCard
            as="button"
            className="p-[5.5px 10px] relative right-0 top-0 h-full cursor-pointer rounded-[0_10px_10px_0] bg-app_black"
            onClick={() => setSearchVal("")}
          >
            clear
          </DivCard>
        ) : null}
      </DivCard>
    </DivCard>
  );
}
