import { NavBar } from "@/components/molecules";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
}
