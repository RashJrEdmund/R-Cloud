import { AuthGuard } from "@/providers/guards";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function PrivatelySharedFileLayout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>;
}
