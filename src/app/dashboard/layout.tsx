import { DivCard } from "@/components/atoms";
import { DashboardSideNav, DashboardTopNav } from "@/components/molecules";
import { AuthGuard, DashboardGuard } from "@/providers/guards";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  description: "R - Cloud dashboard page",
  alternates: {
    canonical: "/dashboard",
  },
  keywords: [
    "r-cloud",
    "r cloud",
    "could",
    "service",
    "storage",
    "google-drive",
    "Roger",
    "Rash",
    "R",
    "Admin",
    "Super admin",
    "dashboard",
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardGuard>
        <DivCard className="w-full justify-start items-start">
          <DashboardSideNav />

          <DivCard className="w-full flex-col items-start">
            <DashboardTopNav />

            <DivCard as="main" className="w-full max-w-default_app_max_w mx-auto min-h-[90vh] items-stretch px-2 pb-2 pt-[4.3rem]">
              {children}
            </DivCard>
          </DivCard>
        </DivCard>
      </DashboardGuard>
    </AuthGuard>
  );
}
