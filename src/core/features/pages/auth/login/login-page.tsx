import { MainTag } from "@/components/atoms";
import LoginForm from "./login-form/login-form";

interface Props {}

export default function LoginPage({}: Props) {
  return (
    <MainTag className="justify-center">
      <LoginForm />
    </MainTag>
  );
}
