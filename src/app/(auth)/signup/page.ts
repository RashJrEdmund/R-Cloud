import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // to dynamically generate metadata
  return {
    title: "Signup",
    description: "r-cloud sign-up page",
    alternates: {
      canonical: "/signup",
    },
  };
}

export { SignupPage as default } from "@/features/pages";
