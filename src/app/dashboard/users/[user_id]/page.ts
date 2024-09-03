import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Users/",
    description: "r-cloud single user page in dashboard",
  };
}

export { DashboardSingleUsePage as default } from "@/features/pages";
