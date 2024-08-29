import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Public File",
    description: "a publicly shared file on r-cloud",
  };
}

export { PubliclySharedDynamicRoutePage as default } from "@/features/pages";
