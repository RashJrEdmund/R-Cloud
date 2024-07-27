"use client";

/* FILE_DESC +=> ======================
| Layout for strictly protected routes |
==========================//==========*/

import { AuthGuard } from "@/providers/guards";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>;
};

// function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { currentUser, userLoading } = useUserStore();
//   const router = useRouter();

//   if (userLoading) {
//     return "Loading ..." // loading component
//   }

//   if (!currentUser) {
//     router.push("/login?next=" + window.location)
//     return null;
//   }

//   return <>{children}</>
// };

// function _AuthGuard<T>(Component: (p: T) => JSX.Element) {
//   return function Guard(props: Partial<T>) {
//     const { currentUser, userLoading } = useUserStore();
//     const router = useRouter();

//     if (userLoading) {
//       return "Loading ..." // loading component
//     }

//     if (!currentUser) {
//       router.push("/login?next=" + window.location)
//       return null;
//     }

//     return <Component {...(props as unknown as T)} />
//   }
// };
