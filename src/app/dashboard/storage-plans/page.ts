import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "storage-plans",
    description: "r-cloud storage plans page in dashboard",
    alternates: {
      canonical: "/dashboard/storage-plans",
    },
  };
}

export { DashboardStoragePlansPage as default } from "@/features/pages";
