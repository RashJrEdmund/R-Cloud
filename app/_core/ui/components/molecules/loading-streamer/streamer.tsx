'use client';

import { THEME_PALETTE, flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextTag } from '@/components/atoms';

interface Props {
  //
};

const { colors: COLORS } = THEME_PALETTE;

const StyledStreamer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${COLORS.app_bg};
  ${flex_template};

  section {
    ${flex_template}
    gap: 5px;
  }
`;

export default function Streamer({ }: Props) {
  return (
    <StyledStreamer>
      <section>
        <TextTag color_type='success' size='1.25rem' weight='600' gap='5px'>
          <FontAwesomeIcon icon={faSpinner} spin />
        </TextTag>

        <TextTag color_type='success' size='1.25rem' weight='600' gap='5px' no_white_space>
          R-Cloud
        </TextTag>
      </section>
    </StyledStreamer>
  );
};
