import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Public File",
    description: "a privately shared file on r-cloud",
  };
}

export { PrivatelySharedDynamicRoutePage as default } from "@/features/pages";
