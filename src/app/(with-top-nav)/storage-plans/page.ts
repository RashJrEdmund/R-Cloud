import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Storage Plans",
    description: "r-cloud storage plans page",
    alternates: {
      canonical: "/storage-plans",
    },
  };
}

export { StoragePlansPage as default } from "@/features/pages";
