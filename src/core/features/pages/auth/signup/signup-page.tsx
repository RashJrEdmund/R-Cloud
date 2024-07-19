import { Metadata } from "next";
import { MainTag } from "@/components/atoms";
import SignupForm from "./signup-form/signup-form";

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

interface Props {}

export default function SignupPage({}: Props) {
  return (
    <MainTag className="justify-center">
      <SignupForm />
    </MainTag>
  );
}
