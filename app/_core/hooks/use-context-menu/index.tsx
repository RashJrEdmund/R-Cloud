'use client';

import { useState, useRef, useEffect } from 'react';
import { ContextMenu } from '@/components/modals';
import type { IModalWrapperRef } from '@/components/modals/generics';
import type { ContextMenuContent } from '@/interfaces/app';
import type { RefObject } from 'react';

interface Props {
  content: ContextMenuContent[];

  top?: string; left?: string;
};

export default function useContextMenu({ content, top = '0', left = '0' }: Props): {
  // eslint-disable-next-line no-unused-vars
  ContextMenu: (props: { children?: React.ReactNode }) => JSX.Element;

  contextMenuRef: RefObject<IModalWrapperRef>;
  setContextCoordinates: React.Dispatch<React.SetStateAction<{ top: string; left: string; }>>
} {
  const [contextCoordinates, setContextCoordinates] = useState<{ top: string; left: string; }>({ top, left });
  const contextMenuRef = useRef<IModalWrapperRef>(null);

  function MenuComponent({ children = null }: { children?: React.ReactNode }) {
    return (
      <ContextMenu
        ref={contextMenuRef}
        content={content}
        top={contextCoordinates.top}
        left={contextCoordinates.left}
      >
        {children}
      </ContextMenu>
    );
  }

  return {
    ContextMenu: MenuComponent,

    contextMenuRef,

    setContextCoordinates,
  };
};
