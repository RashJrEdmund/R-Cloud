"use client";

import type {
  ChangeEvent,
  ChangeEventHandler,
  ComponentProps,
  ForwardedRef,
} from "react";

import { useRef, useState } from "react";
import { TextField, TextTag } from "@/components/atoms";
import { cn } from "@/core/lib/utils";
import { LoaderCircle } from "lucide-react";

interface Props extends ComponentProps<"input"> {
  field_title: string;
  field_name: string;
  value?: string;
  onValueChange?: ChangeEventHandler<HTMLInputElement>;
  leave_active?: boolean;
  success?: string | null;
  error?: string | null;
  type?: "text" | "password" | "email" | "date";
  isLoading?: boolean;

  sxFieldSet?: string;
  sxTitle?: string;
  sxSuccess?: string;
  sxError?: string;
}

export default function InputField({
  field_name,
  value,
  onValueChange,
  success = null,
  error = null,
  type = "text",
  field_title = "title",
  leave_active = false,
  sxFieldSet,
  sxTitle,
  sxSuccess,
  sxError,
  isLoading,

  className,
  ...restProps
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
    <fieldset
      className={cn(
        "relative mx-0 my-[10px] flex h-fit w-full items-center justify-center rounded-[10px] border border-app_bg_light",
        sxFieldSet
      )}
    >
      <TextTag
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 translate-x-[10px] cursor-text rounded-[3px] px-0 py-[5px] text-[1rem] duration-300",
          active ? "top-0 bg-app_bg text-[0.75rem]" : "",
          sxTitle
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {field_title}
      </TextTag>

      {!isLoading && error ? (
        <TextTag
          className={cn(
            "absolute right-[10px] top-full cursor-text text-[12px] text-app_error",
            sxError
          )}
        >
          {error}
        </TextTag>
      ) : null}

      {!isLoading && success ? (
        <TextTag
          className={cn(
            "absolute left-[10px] top-full cursor-text text-[12px] text-app_text_blue",
            sxSuccess
          )}
        >
          {success}
        </TextTag>
      ) : null}

      {isLoading ? (
        <TextTag
          className={cn(
            "absolute left-[10px] top-full mt-[2.5px] cursor-text text-[12px] text-app_text_blue",
            sxSuccess
          )}
        >
          <LoaderCircle size={14} className="animate-spin text-app_blue" />
        </TextTag>
      ) : null}

      <TextField
        {...restProps}
        ref={inputRef as ForwardedRef<HTMLInputElement>}
        className={cn(
          "min-h-[2.7rem] w-full text-app_text placeholder:text-app_text_grayed",
          className
        )}
        onFocus={() => setActive(true)}
        onBlur={() =>
          !fieldVal?.trim() && !leave_active ? setActive(false) : null
        }
        onChange={handleInputChange}
        value={value ?? fieldVal}
        type={type}
        name={field_name}
      />
    </fieldset>
  );
}
