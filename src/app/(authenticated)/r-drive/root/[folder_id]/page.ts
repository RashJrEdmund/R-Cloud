import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Files & Folders",
    description: "r-cloud files and folders page",
  };
}

export { FilesFolderDisplayPage as default } from "@/features/pages";
