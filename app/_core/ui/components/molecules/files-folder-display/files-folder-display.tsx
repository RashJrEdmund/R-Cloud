'use client';

import { FileCard, FolderCard } from './components';
import StyledFileFolderDisplay from './styled-file-folder-display';

interface Props {
  //
};

// map and display cards here

export default function FilesFolderDisplay({}: Props) {
  return (
    <StyledFileFolderDisplay>
      <FileCard />
      <FolderCard />
    </StyledFileFolderDisplay>
  );
};
