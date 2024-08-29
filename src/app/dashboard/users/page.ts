import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Users",
    description: "r-cloud users page in dashboard",
    alternates: {
      canonical: "/dashboard/users",
    },
  };
}

export { DashboardUsersPage as default } from "@/features/pages";
