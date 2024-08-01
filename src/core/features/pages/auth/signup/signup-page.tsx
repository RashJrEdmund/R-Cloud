import { MainTag } from "@/components/atoms";
import SignupForm from "./signup-form/signup-form";

interface Props {}

export default function SignupPage({}: Props) {
  return (
    <MainTag className="justify-center">
      <SignupForm />
    </MainTag>
  );
}
