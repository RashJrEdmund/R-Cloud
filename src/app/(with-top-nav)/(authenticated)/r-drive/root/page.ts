import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Root",
    description: "r-cloud base root directory for files and folders",
    alternates: {
      canonical: "/r-drive/root",
    },
  };
}

export { FilesFolderDisplayPage as default } from "@/features/pages";
