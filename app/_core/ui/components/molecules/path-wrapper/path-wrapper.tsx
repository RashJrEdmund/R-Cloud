'use client';

interface Props {
  children: React.ReactNode;
};

export default function PathWrapper({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
};
