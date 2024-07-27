import { DashboardGuard } from "@/providers/guards";
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
    <DashboardGuard>
      {children}
    </DashboardGuard>
  );
}
