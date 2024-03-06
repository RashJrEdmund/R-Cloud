'use client';

import { DivCard, TextTag } from '@/components/atoms';
import { logOut } from '@/core/config/firebase';
import { useDocStore, useUserStore } from '@/store/zustand';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import type { LegacyRef } from 'react';

interface Props {
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  coordinates: {
    top: string;
    left: string;
  }
};

export default function ProfileDropDown({ showDropDown, setShowDropDown, coordinates }: Props) {
  const { setCurrentUser } = useUserStore();
  const { setDocuments } = useDocStore();
  const dropDownRef = useRef<HTMLDivElement>();
  const router = useRouter();

  const handleLogOut = () => {
    logOut().then(() => {
      setCurrentUser(null);
      setDocuments(null);
      router.replace('/');
    });
  };

  const DROP_DOWN_CONTENT = useMemo(() => {
    return [
      {
        action: () => router.push('/r-drive'),
        text: 'R-Drive',
      },
      {
        action: () => router.push('/r-drive/root'),
        text: 'Root',
      },
      {
        action: () => router.push('/profile'),
        text: 'My Profile',
      },
      {
        action: () => router.push('/storage-plans'),
        text: 'Storage Plans',
      },
      {
        action: handleLogOut,
        text: 'Log Out',
      },
    ];
  }, [router]);

  useEffect(() => {
    if (showDropDown) {
      dropDownRef.current?.focus();
    }
  }, [showDropDown]);

  return showDropDown ? (
    <DivCard
      border
      tabIndex={5} // to make it focusable
      ref={dropDownRef as LegacyRef<HTMLDivElement>}
      bg='white'
      position='absolute' // parent component has position absolute.
      top={coordinates.top}
      left={coordinates.left}
      padding='1rem 1rem 10px 10px'
      gap='1rem'
      flex_dir='column'
      align='start'
      radius='8px'
      min_width='150px'
      onBlur={() => setShowDropDown(false)}
    >
      {DROP_DOWN_CONTENT.map(({ text, action }) => (
        <TextTag
          no_white_space
          cursor='pointer'
          key={text}
          onClick={() => {
            action();
            setShowDropDown(false);
          }}
        >
          {text}
        </TextTag>
      ))}
    </DivCard>
  ) : null;
};
