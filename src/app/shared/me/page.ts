import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Public File",
    description: "files shared to my r-cloud",
    alternates: {
      canonical: "/shared/me",
    },
  };
}

export { SharedWithMePage as default } from "@/features/pages";
