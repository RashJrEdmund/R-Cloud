'use client';

import { DivCard, TextTag } from '@/components/atoms';
import { logOut } from '@/core/config/firebase';
import { useUserStore } from '@/store/zustand';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import type { LegacyRef } from 'react';

interface Props {
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileDropDown({ showDropDown, setShowDropDown }: Props) {
  const { setCurrentUser } = useUserStore();
  const dropDownRef = useRef<HTMLDivElement>();
  const router = useRouter();

  const handleLogOut = () => {
    logOut().then(() => {
      setCurrentUser(null);
      router.replace('/');
    });
  };

  const DROP_DOWN_CONTENT = useMemo(() => {
    return [
      {
        action: () => router.push('/home'),
        text: 'Home',
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
      top='calc(100% + 1rem)'
      left='0'
      padding='1rem 1rem 10px 10px'
      gap='1rem'
      flex_dir='column'
      align='start'
      radius='8px'
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
