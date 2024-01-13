'use client';

import { useState } from 'react';

export default function AuthGuardC(Component: React.JSXElementConstructor<React.ReactNode>) {
  return function Guard(props: any) {
    const [currentUser, setCurrentUser] = useState<null>(null);

    return <Component {...props} currentUser={currentUser}/>;
  };
};
