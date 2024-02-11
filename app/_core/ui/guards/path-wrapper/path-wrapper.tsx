'use client';

import type { IDocument } from '@/interfaces/entities';

export default function PathWrapper(Component: React.JSXElementConstructor<any>) {
  return function Gaurd(props: any) {
    const content: IDocument[] = [];

    return <Component {...props} content={content} />;
  };
};
