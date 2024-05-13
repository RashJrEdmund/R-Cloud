'use client';

import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';

const StyledProfileImage = styled.section`
  ${flex_template}
  flex-direction: column;
  width: min(90vw, 320px);
  height: fit-content;
  margin: 0 0 1rem;

  img {
    width: 100%;
  }

  .image-upload-label {
    background-color: transparent;
    position: absolute; // text tag has position relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 100%;
    height: 2px;
    min-height: 100%;
    overflow: hidden;
    cursor: pointer;

    &* {
      cursor: pointer;
    }

    .image-upload-field {
      width: 0;
      height: 0;
    }
  }
`;

export default StyledProfileImage;
