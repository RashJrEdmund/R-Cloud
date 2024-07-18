"use client";

import { THEME_PALETTE } from "@/core/ui/theme";
import { css } from "@emotion/react";
import { BgVariants, HoverEffectVariants } from "./types";

const { colors: COLORS } = THEME_PALETTE;

const generateBg = (bg: BgVariants) => {
  if (bg === "grayed") {
    return css`
      background-color: ${COLORS.bg_grayed};
      color: ${COLORS.text};
    `;
  } else if (bg === "light") {
    return css`
      background-color: ${COLORS.bg_light};
      color: ${COLORS.text_dark};
    `;
  } else if (bg === "invert") {
    return css`
      background-color: ${COLORS.bg_invert};
      color: ${COLORS.text_invert};
    `;
  } else if (bg === "blued") {
    return css`
      background-color: ${COLORS.app_blue};
      color: ${COLORS.text_white};
    `;
  } else if (bg === "white") {
    return css`
      background-color: ${COLORS.white};
      color: ${COLORS.text_dark};
    `;
  } else if (bg === "black") {
    return css`
      background-color: ${COLORS.black};
      color: ${COLORS.text_white};
    `;
  } else if (bg === "error") {
    return css`
      border: 1px solid ${COLORS.border_error};
      color: ${COLORS.text};
    `;
  } else if (bg === "normal") {
    // bg === 'normal';
    return css`
      background-color: ${COLORS.bg};
      color: ${COLORS.text};
    `;
  } else if (bg === "none") {
    // bg === 'none';
    return css`
      background: none;
      color: ${COLORS.text};
    `;
  } else {
    return css`
      background-color: inherit;
      color: ${COLORS.text};
    `;
  }
};

/* CSS UP-DOWN ANIMATION */

const createUpDownAnimation = (animate: boolean) => {
  if (!animate) return "";

  return css`
    -webkit-animation: MoveUpDown 1700ms linear infinite;

    @-webkit-keyframes MoveUpDown {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(-1px);
      }
    }
  `;
};

/* ANIMATIONS */

const createLeftRightAnimation = (animate: boolean) => {
  if (!animate) return "";

  return css`
    -webkit-animation: MoveUpDown 1700ms linear infinite;

    @-webkit-keyframes MoveUpDown {
      0% {
        transform: translate(0);
      }
      50% {
        transform: translate(10px);
      }
      100% {
        transform: translate(-1px);
      }
    }
  `;
};

const createHoverEffect = (hover_effect: HoverEffectVariants) => {
  switch (hover_effect) {
    case "translate":
      return css`
        transition: 300ms;

        &:hover {
          transform: translateY(-10px);
        }
      `;
    case "scale":
      return css`
        transition: 300ms;

        &:hover {
          transform: scale(1.15);
        }
      `;
    default: // hover_effect = 'none'
      return "";
  }
};

/* GRID TEMPLATE COLUMNS */

export {
  generateBg,
  createUpDownAnimation,
  createLeftRightAnimation,
  createHoverEffect,
};
