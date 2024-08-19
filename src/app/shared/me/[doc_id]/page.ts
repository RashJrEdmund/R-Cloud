import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Public File",
    description: "a publicly share file on r-cloud",
    alternates: {
      canonical: "/shared/pub",
    },
  };
}

export { SharedWithMeDynamicPage as default } from "@/features/pages";
