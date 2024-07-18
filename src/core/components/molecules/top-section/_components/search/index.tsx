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
        width="min(300px, 97vw)"
        position="relative"
        border
        radius="10px"
        onSubmit={handleSubmit}
      >
        <TextField
          ref={inputRef as LegacyRef<HTMLInputElement>}
          placeholder={"Quick search - " + searchCombo}
          value={searchVal}
          onChange={handleChange}
          sx="border: none"
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
            position="relative"
            bg="black"
            top="0"
            right="0"
            height="100%"
            padding="5.5px 10px"
            radius="0 10px 10px 0"
            cursor="pointer"
            onClick={() => setSearchVal("")}
          >
            clear
          </DivCard>
        ) : null}
      </DivCard>
    </DivCard>
  );
}
