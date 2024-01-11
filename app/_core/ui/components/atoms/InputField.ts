'use client';

import { THEME_PALLETE } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { colors: COLORS } = THEME_PALLETE;

interface Props {
    sx?: string; // for overiding styles
    margin?: string;
    radius?: string;
    color_type?: 'invert' | 'normal';
}

export const generateFieldColors = (color_type: 'invert' | 'normal') => {
  if (color_type === 'invert') {
    return css`
            color: ${COLORS.text};
            border: 1px solid ${COLORS.text_invert};

            &::placeholder {
                color: ${COLORS.text_grayed};
            }
        `;
  } else { // color_type === 'normal';
    return css`
            color: ${COLORS.text};
            border: 1px solid ${COLORS.border};

            &::placeholder {
                color: ${COLORS.text_grayed};
            }
        `;
  }
};

const TextField = styled.input<Partial<Props>>`
    ${({ color_type = 'normal' }) => generateFieldColors(color_type)}

    border-radius: ${({ radius = '10px'}) => radius};
    padding: 5px 10px;
    margin: ${({margin = '0 2px'}) => margin};

    ${({ sx }) => sx};
`;

export default TextField;
