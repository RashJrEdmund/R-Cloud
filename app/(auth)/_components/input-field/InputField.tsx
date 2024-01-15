'use client';

import styled from '@emotion/styled';
import { TextField, TextTag } from '@/components/atoms';
import { flex_template } from '@/core/ui/theme';
import { ChangeEvent, useState } from 'react';

interface Props {
  field_title: string;
  field_name: string;
  leave_active?: boolean;
  type?: 'text' | 'password' | 'email' | 'date';
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
    transform: translate(10px, -50%);
    border-radius: 3px;
    padding: 0 5px;
    transition: 300ms;
    font-size: 1rem;

    &.active {
      background-color: var(--bg_light);
      top: 0;
      transform: translate(10px, -50%);
      font-size: 0.75rem;
    }
  }
`;

export default function InputField({ field_name, type = 'text', field_title = 'title', leave_active = false }: Props) {
  const [active, setActive] = useState<boolean>(leave_active);
  const [fieldVal, setFieldVal] = useState<string>('');

  return (
    <StyledInput>
      <TextTag
        className={`title ${active ? 'active' : ''}`}
        color_type={active ? 'normal' : 'grayed'}
      >
        {field_title}
      </TextTag>

      <TextField
        onFocus={() => setActive(true)}
        onBlur={() => (!fieldVal?.trim() && !leave_active) ? setActive(false) : null}

        onChange={(e: ChangeEvent<any>) => setFieldVal(e.target.value)}
        value={fieldVal}
        type={type}
        name={field_name}
        min_height='3rem'
      />
    </StyledInput>
  );
};
