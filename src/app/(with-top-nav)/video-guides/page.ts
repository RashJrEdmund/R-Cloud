import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Video Guides",
    description: "video guides on how to navigate and use the r-cloud",
    alternates: {
      canonical: "/video-guides",
    },
  };
}

export { VideoGuidesPage as default } from "@/features/pages";
