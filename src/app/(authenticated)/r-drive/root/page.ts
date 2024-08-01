import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Root",
    description: "r-cloud base root directory",
    alternates: {
      canonical: "/r-drive/root",
    },
  };
}

export { FilesFolderDisplayPage as default } from "@/features/pages";
