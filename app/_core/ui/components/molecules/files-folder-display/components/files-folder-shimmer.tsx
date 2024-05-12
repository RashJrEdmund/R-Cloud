import type { IDisplayLayout } from '@/interfaces/app';
import StyledFileFolderDisplay from '../styled-file-folder-display';
import { StyledShimmerCard } from './shared';
import { DivCard } from '@/components/atoms';

export default function FilesFolderShimmer({ displayLayout }: { displayLayout: IDisplayLayout }) {
  return (
    <StyledFileFolderDisplay
      className={displayLayout.toLowerCase() + '-layout'} // e.g grid-layout or list-layout
    >
      {
        displayLayout === 'GRID' ? (
          new Array(16).fill(null).map((_, i) => (
            <StyledShimmerCard key={i} />
          ))
        ) : (
          new Array(16).fill(null).map((_, i) => (
            <DivCard key={i} width='100%' flex_wrap='nowrap' justify='start' padding='20px 10px' cursor='pointer' bg='light' margin='2px 0'>
              {null}
            </DivCard>
          ))
        )
      }
    </StyledFileFolderDisplay>
  );
}
