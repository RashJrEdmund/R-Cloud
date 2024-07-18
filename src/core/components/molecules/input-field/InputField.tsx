"use client";

import styled from "@emotion/styled";
import { TextField, TextTag } from "@/components/atoms";
import { THEME_PALETTE, flex_template } from "@/core/ui/theme";
import {
  ChangeEvent,
  ChangeEventHandler,
  LegacyRef,
  useRef,
  useState,
} from "react";

const { colors: COLORS } = THEME_PALETTE;

interface Props {
  field_title: string;
  field_name: string;
  value?: string;
  onValueChange?: ChangeEventHandler<HTMLInputElement>;
  leave_active?: boolean;
  error?: string | null;
  type?: "text" | "password" | "email" | "date";
}

const StyledInput = styled.fieldset`
  ${flex_template}
  width: 100%;
  height: fit-content;
  margin: 10px 0;
  border: 1px solid ${COLORS.bg_light};
  border-radius: 8px;

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

export default function InputField({
  field_name,
  value,
  onValueChange,
  error = null,
  type = "text",
  field_title = "title",
  leave_active = false,
}: Props) {
  const [active, setActive] = useState<boolean>(leave_active);
  const [fieldVal, setFieldVal] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(); // is of type MutableRefObject<HTMLInputElement>;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e); // if there's a change event handler passed, it will work instead of component's local setFieldVal function
      return;
    }

    setFieldVal(e.target.value);
  };

  return (
    <StyledInput>
      <TextTag
        className={`title ${active ? "active" : ""}`}
        color_type={active ? "normal" : "normal"}
        onClick={() => inputRef.current?.focus()}
        cursor="text"
      >
        {field_title}
      </TextTag>

      {error ? (
        <TextTag className="error-message" color_type="error" cursor="text">
          {error}
        </TextTag>
      ) : null}

      <TextField
        ref={inputRef as LegacyRef<HTMLInputElement>}
        onFocus={() => setActive(true)}
        onBlur={() =>
          !fieldVal?.trim() && !leave_active ? setActive(false) : null
        }
        onChange={handleInputChange}
        value={value ?? fieldVal}
        type={type}
        color_type="no_border"
        name={field_name}
        min_height="2.7rem"
        width="100%"
      />
    </StyledInput>
  );
}
