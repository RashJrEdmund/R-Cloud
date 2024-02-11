'use client';

import { DivCard, TextField } from '@/components/atoms';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Props {
  //
};

export default function Search({ }: Props) {
  const [searchVal, setSearchVal] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    // handle fetch. use debouncer.
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.clear();
    console.log(e.target.value);
    setSearchVal(e.target.value);
  };

  return (
    <DivCard as='search'>
      <DivCard
        as='form'
        width='min(250px, 97vw)'
        onSubmit={handleSubmit}
      >

        <TextField
          placeholder='Search this directory'
          value={searchVal}
          onChange={handleChange}
        />
      </DivCard>
    </DivCard>
  );
};
