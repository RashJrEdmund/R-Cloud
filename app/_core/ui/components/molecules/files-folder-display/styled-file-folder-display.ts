'use client';

import styled from '@emotion/styled';

const StyledFileFolderDisplay = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  row-gap: 0;
  width: min(100%, 1000px);
  height: fit-content;
`;

export default StyledFileFolderDisplay;
