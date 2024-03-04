'use client';

import { useEffect, useLayoutEffect } from 'react';
import { DivCard } from '@/components/atoms';
import { useAppStore } from '@/store/zustand';
import Image from 'next/image';
import { CLIENT_STORAGE } from '@/core/lib';
import type { IDisplayLayout } from '@/interfaces/app';

interface Props {
  //
};

export default function DisplayLayout({ }: Props) {
  const { displayLayout, setDisplayLayout } = useAppStore();

  useLayoutEffect(() => {
    const localStorage = new CLIENT_STORAGE('local');

    const layout_type = localStorage.get<IDisplayLayout>('layout_type', { isString: true });

    if (['GRID', 'LIST'].includes(layout_type)) {
      if (layout_type === displayLayout) return;

      setDisplayLayout(layout_type);
      return;
    }
  }, []);

  useEffect(() => {
    const localStorage = new CLIENT_STORAGE('local');

    const layout_type = localStorage.get<IDisplayLayout>('layout_type', { isString: true });

    if (['GRID', 'LIST'].includes(layout_type) && layout_type === displayLayout) return;

    localStorage.save('layout_type', displayLayout, { isString: true });
  }, [displayLayout]);

  return (
    <DivCard border radius='10px'>
      <DivCard radius='8px 0 0 8px' padding='4px 5px' cursor='pointer'
        bg={displayLayout === 'GRID' ? 'grayed' : 'none'}
      >
        <Image src='/icons/display-layout-grid.svg' alt='display-layout-grid' height={25} width={25}
          draggable={false}
          style={{
            color: 'red'
          }}
          onClick={() => setDisplayLayout('GRID')}
        />
      </DivCard>

      <DivCard radius='0 8px 8px 0' padding='4px 5px' cursor='pointer'
        bg={displayLayout === 'LIST' ? 'grayed' : 'none'}
      >
        <Image src='/icons/display-layout-list.svg' alt='display-layout-list' height={25} width={25}
          draggable={false}
          onClick={() => setDisplayLayout('LIST')}
        />
      </DivCard>
    </DivCard>
  );
};
