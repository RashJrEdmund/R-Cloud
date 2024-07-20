"use client";

import { THEME_PALETTE } from "@/core/ui/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

const { colors: COLORS } = THEME_PALETTE;

interface Props {
  sx?: string; // for overiding styles
  margin?: string;
  padding?: string;
  radius?: string;
  width?: string;
  min_height?: string;
  color_type?: "invert" | "normal" | "no_border";
};

export const generateFieldColors = (
  color_type: "invert" | "normal" | "no_border"
) => {
  if (color_type === "invert") {
    return css`
      color: ${COLORS.text};
      border: 1px solid ${COLORS.text_invert};

      &::placeholder {
        color: ${COLORS.text_grayed};
      }
    `;
  } else if (color_type === "no_border") {
    return css`
      color: ${COLORS.text};
      border: 1px solid transparent;

      &::placeholder {
        color: ${COLORS.text_grayed};
      }
    `;
  } else {
    // color_type === 'normal';
    return css`
      color: ${COLORS.text};
      border: 1px solid ${COLORS.border};

      &::placeholder {
        color: ${COLORS.text_grayed};
      }
    `;
  }
};

const _TextField = styled.input<Props>`
  ${({ color_type = "normal" }) => generateFieldColors(color_type)}

  border-radius: ${({ radius = "10px" }) => radius};
  padding: ${({ padding = "5px 10px" }) => padding};
  margin: ${({ margin = "0" }) => margin};
  width: ${({ width = "100%" }) => width};
  min-height: ${({ min_height = "unset" }) => min_height};

  ${({ sx }) => sx};
`;

interface TextFieldProps extends ComponentProps<"input"> { };

export default function TextField({ className, ...restProps }: TextFieldProps) {
  return (
    <input
      {...restProps}
      className={cn("rounded-[10px] m-0 w-full p-[5px_10px]", className)}
    />
  )
};

