'use client';

import styled from '@emotion/styled';
import { TextField, TextTag } from '../../atoms';
import { flex_template } from '@/core/ui/theme';
import { ChangeEvent, useState } from 'react';

interface Props {
  type?: 'text' | 'password' | 'email' | 'date';
  field_title?: string;
  field_name: string;
};

const StyledInput = styled.fieldset`
  ${flex_template}
  width: 100%;
  height: fit-content;
  margin: 10px 0;

  position: relative;

  .title {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(15%, -50%);
    border-radius: 3px;
    padding: 0 5px;
    transition: 300ms;
    font-size: 1rem;

    &.active {
      background-color: var(--bg_light);
      top: 0;
      transform: translate(50%, -50%);
      font-size: 0.75rem;
    }
  }
`;

export default function InputField({ field_name, type = 'text', field_title = 'title' }: Props) {
  const [active, setActive] = useState<boolean>(false);
  const [fieldVal, setFieldVal] = useState<string>('');

  return (
    <StyledInput>
      <TextTag className={`title ${active ? 'active' : ''}`}>
        {field_title}
      </TextTag>

      <TextField
        onFocus={() => setActive(true)}
        onBlur={() => !fieldVal?.trim() ? setActive(false) : null}

        onChange={(e: ChangeEvent<any>) => setFieldVal(e.target.value)}
        value={fieldVal}
        type={type}
        width='100%'
        min_height='2.6rem'
      />
    </StyledInput>
  );
};
