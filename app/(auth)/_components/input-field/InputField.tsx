'use client';

import styled from '@emotion/styled';
import { TextField, TextTag } from '@/components/atoms';
import { THEME_PALLETE, flex_template } from '@/core/ui/theme';
import { ChangeEvent, LegacyRef, useRef, useState } from 'react';

const {
  colors: COLORS,
} = THEME_PALLETE;

interface Props {
  field_title: string;
  field_name: string;
  leave_active?: boolean;
  error?: string | null;
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
      background-color: ${COLORS.bg_light};
      top: 0;
      transform: translate(10px, -50%);
      font-size: 0.75rem;
    }
  }

  .error-message {
    position: absolute;
    right: 10px;
    top: 100%;
    font-size: 12px;
  }
`;

export default function InputField({ field_name, error = 'null', type = 'text', field_title = 'title', leave_active = false }: Props) {
  const [active, setActive] = useState<boolean>(leave_active);
  const [fieldVal, setFieldVal] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(); // is of type MutableRefObject<HTMLInputElement>;

  return (
    <StyledInput>
      <TextTag
        className={`title ${active ? 'active' : ''}`}
        color_type={active ? 'normal' : 'normal'}
        onClick={() => inputRef.current?.focus()}
        cursor='text'
      >
        {field_title}
      </TextTag>

      <TextTag
        className='error-message'
        color_type='error'
        cursor='text'
      >
        {error}
      </TextTag>

      <TextField
        ref={inputRef as LegacyRef<HTMLInputElement>}
        onFocus={() => setActive(true)}
        onBlur={() => (!fieldVal?.trim() && !leave_active) ? setActive(false) : null}

        onChange={(e: ChangeEvent<any>) => setFieldVal(e.target.value)}
        value={fieldVal}
        type={type}
        color_type='invert'
        name={field_name}
        min_height='2.7rem'
        width='100%'
        // error={error}
      />
    </StyledInput>
  );
};
