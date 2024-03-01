'use client';

import { DivCard } from '@/components/atoms';
import { useAppStore } from '@/store/zustand';
import Image from 'next/image';

interface Props {
  //
};

export default function DisplayLayout({ }: Props) {
  const { displayLayout, setDisplayLayout } = useAppStore();

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
