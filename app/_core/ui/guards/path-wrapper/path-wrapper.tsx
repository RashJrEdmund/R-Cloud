'use client';

export default function PathWrapper(Component: React.JSXElementConstructor<any>) {
  return function Gaurd(props: any) {
    return <Component {...props} />;
  };
};
