'use client';

'use client';

import styled from '@emotion/styled';
import { THEME_PALETTE } from '@/_core/ui/theme';
import { useAppStore } from '@/store/zustand';
import { Overlay } from '@/components/atoms';
import { useEffect, useState } from 'react';

import type { IDocument } from '@/interfaces/entities';
import { useContextMenuContext } from '@/store/context';

const {
} = THEME_PALETTE;

interface _props {
  absolute: boolean;
}

const StyledCheckBox = styled.input<_props>`
  position: ${({ absolute }) => absolute ? 'absolute' : 'unset'}; // parents have position relative
  margin-right: 5px;
  z-index: 5;
  cursor: pointer;
`;

interface Props {
  document: IDocument
};

export default function SelectCheckbox({ document }: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  const { displayLayout } = useAppStore();

  const { selectionStart, selectedDocs, handleDocumentSelection } = useContextMenuContext();

  const handleSelection = () => {
    console.log('selection made');
    handleDocumentSelection(document);
  };

  useEffect(() => {
    if (selectedDocs.includes(document.id)) setChecked(true);
    else setChecked(false);

    // console.clear();
    // console.log(selectedDocs);

  }, [selectedDocs]);

  return selectionStart ? (
    <>
      <Overlay
        show
        position='absolute'
        onClick={handleSelection}
        z_index='3'
        sx='background-color: transparent; cursor: pointer;'
      />

      <StyledCheckBox
        absolute={displayLayout === 'GRID'}
        type='checkbox'
        checked={checked}
        onClick={handleSelection}
      />
    </>
  ) : null;
};
