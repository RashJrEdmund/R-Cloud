import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Profile",
    description: "r-cloud profile page",
    alternates: {
      canonical: "/profile",
    },
  };
}

export { ProfilePage as default } from "@/features/pages";
