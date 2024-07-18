"use client";

import { FormWrapper, FormOrSeparator } from "../../components";
import { InputField } from "@/components/molecules";
import {
  loginWithEmailAndPass,
  signInOrUpWithGooglePopup,
} from "@/core/config/firebase";
import { Button, TextTag } from "@/components/atoms";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateUserProfile } from "../../auth-helpers";

import { validateLoginForm } from "../../services/form-validations";
import type { MouseEventHandler } from "react";
import type { FieldErrors } from "../../services/form-validations/form-interfaces";

interface Props {
  //
}

export default function LoginForm({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors | null>(null);
  const [formStatus, setFormStatus] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const router = useRouter();

  const handleGoogleLogin: MouseEventHandler<HTMLButtonElement> = () => {
    signInOrUpWithGooglePopup().then(async (res) => {
      const user = res?.user;
      const tokenRes = (res as any)._tokenResponse;
      if (tokenRes.isNewUser) {
        await handleCreateUserProfile(user, null, { setFormStatus });
      } else {
        setFormStatus({
          status: 200,
          message: `welcome back ${user?.displayName || user?.email?.split("@").shift() || "user"}`,
        });
      }

      router.push("/r-drive");
    });
  };

  const loginFormAction = (formData: FormData) => {
    setLoading(true);
    setErrors(null);
    setFormStatus(null);

    const rawData: { [key: string]: string } = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    const validation = validateLoginForm(rawData);

    if (validation.errors) {
      setFormStatus({ status: 401, message: validation.message || "" });
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // API CALL.
    loginWithEmailAndPass(rawData.email, rawData.password)
      .then((user) => {
        setFormStatus({
          status: 200,
          message: `welcome back ${user?.displayName || user?.email?.split("@").shift() || "user"}`,
        });
        router.push("/r-drive");
      })
      .catch(() => {
        setFormStatus({
          status: 401,
          message:
            "Could not log in to account. Try again or use another method",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormWrapper img_url="login-img.svg" formAction={loginFormAction}>
      <TextTag as="h1" size="2rem" weight="600">
        Log In
      </TextTag>

      <TextTag as="p" color_type="grayed" text_align="left">
        Please login to continue to your account
      </TextTag>

      {formStatus ? (
        <TextTag
          as="p"
          color_type={formStatus.status === 200 ? "success" : "error"}
          text_align="left"
          size="0.9rem"
        >
          {formStatus.message}
        </TextTag>
      ) : null}

      <InputField
        field_title="Email"
        field_name="email"
        error={errors?.email}
      />

      <InputField
        field_title="Password"
        field_name="password"
        type="password"
        error={errors?.password}
      />

      <label htmlFor="keep-me-logged-in" className="keep-me-logged-in">
        <input
          type="checkbox"
          name="keep-me-logged-in"
          id="keep-me-logged-in"
        />
        keep me logged in
      </label>

      <Button
        type="submit"
        bg="blued"
        width="100%"
        padding="7px 0"
        disabled={loading}
        cursor={loading ? "not-allowed" : "pointer"}
      >
        {loading ? "loading..." : "Sign In"}
      </Button>

      <FormOrSeparator />

      <Button
        type="button"
        bg="light"
        width="100%"
        padding="7px 0"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
        <Image
          src="/icons/google-icon.svg"
          alt="google icon"
          height={25}
          width={25}
        />
      </Button>

      <TextTag color_type="grayed" margin="10px auto" sx="align-self: center;">
        Don&apos;t have an account?
        <Link href="/signup">
          <TextTag color_type="success" cursor="pointer">
            Create One
          </TextTag>
        </Link>
      </TextTag>
    </FormWrapper>
  );
}
