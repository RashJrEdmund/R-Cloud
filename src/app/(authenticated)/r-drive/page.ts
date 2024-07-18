import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "R - Drive",
    description: "user drive page",
    alternates: {
      canonical: "/r-drive/",
    },
  };
};

export { RDrivePage as default } from "@/features/pages";
