import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata3
  return {
    title: "Home",
    description: "r-cloud home page",
    alternates: {
      canonical: "/",
    },
  };
}

export { LandingPage as default } from "@/features/pages";
