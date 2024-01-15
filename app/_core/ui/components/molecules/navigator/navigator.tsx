'use client';

import { TextTag } from '@/components/atoms';
import { flex_template } from '@/core/ui/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

interface Props {
  //
};

const StyledNavigator = styled.div`
  align-self: start;
  ${flex_template};
  gap: 1rem;
`;

export default function Navigator({}: Props) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goFoward = () => {
    router.forward();
  };

  return (
    <StyledNavigator>
      <TextTag
        cursor='pointer'
        no_white_space
        onClick={goBack}
      >
        &lt;-
      </TextTag>

      <TextTag
        cursor='pointer'
        no_white_space
        onClick={goFoward}
      >
        -&gt;
      </TextTag>
    </StyledNavigator>
  );
};
