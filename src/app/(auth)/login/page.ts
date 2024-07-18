import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Login",
    description: "r-cloud login page",
    alternates: {
      canonical: "/login",
    },
  };
}

export { LoginPage as default } from "@/features/pages";
