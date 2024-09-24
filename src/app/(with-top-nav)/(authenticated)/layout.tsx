import { AuthGuard } from "@/providers/guards";

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>;
}
