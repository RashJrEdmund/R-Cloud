'use client';

/* FILE_DESC +=> ====================================
| Meant to read current dynamic route and fetch data |
| for the parent folder                              |
========================================//==========*/

import type { IDocument } from '@/interfaces/entities';

export default function PathWrapper(Component: React.JSXElementConstructor<any>) {
  return function Guard(props: any) {
    const content: IDocument[] = [];

    return <Component {...props} content={content} />;
  };
};
