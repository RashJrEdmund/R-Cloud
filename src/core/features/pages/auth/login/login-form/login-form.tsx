"use client";

import { FormWrapper, FormOrSeparator } from "../../components";
import { InputField } from "@/components/molecules";
import {
  loginWithEmailAndPass,
  signInOrUpWithGooglePopup,
} from "@/core/config/firebase";
import { TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleCreateUserProfile } from "../../api/auth-helpers";

import { validateLoginForm } from "../../services/form-validations";
import type { MouseEventHandler } from "react";
import type { FieldErrors } from "../../services/form-validations/form-interfaces";
import { cn } from "@/core/lib/utils";
import { useUserStore } from "@/providers/stores/zustand";
import { extractUserDetailsFromFirebaseAuth } from "@/providers/guards/app-wrapper/app-wrapper.service";
import { useQueryClient } from "@tanstack/react-query";
import { isValidUrl } from "@/core/utils/helpers";

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

  const { setCurrentUser } = useUserStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const verifyNextPath = () => {
    // const nextPath = searchParams.get("next");

    // if (nextPath?.trim() && isValidUrl(nextPath.trim())) {
    //   return router.push(nextPath);
    // }

    router.push("/r-drive");
  };

  const handleGoogleLogin: MouseEventHandler<HTMLButtonElement> = () => {
    signInOrUpWithGooglePopup().then(async (res) => {
      const user = res?.user;
      const tokenRes = (
        res as unknown as { _tokenResponse: { isNewUser: boolean } }
      )._tokenResponse;

      const _user = await extractUserDetailsFromFirebaseAuth(user!);

      setCurrentUser(_user);

      queryClient.refetchQueries({ queryKey: ["current-user-profile"] });

      if (tokenRes.isNewUser) {
        await handleCreateUserProfile(user, null, { setFormStatus });
      } else {
        setFormStatus({
          status: 200,
          message: `welcome back ${user?.displayName || user?.email?.split("@").shift() || "user"}`,
        });
      }

      verifyNextPath();
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
      .then(async (user) => {
        const _user = await extractUserDetailsFromFirebaseAuth(user!);

        setCurrentUser(_user);
        queryClient.refetchQueries({ queryKey: ["current-user-profile"] });

        setFormStatus({
          status: 200,
          message: `welcome back ${user?.displayName || user?.email?.split("@").shift() || "user"}`,
        });

        verifyNextPath();
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
      <TextTag as="h1" className="text-[2rem] font-semibold">
        Log In
      </TextTag>

      <TextTag as="p" className="text-left text-app_text_grayed">
        Please login to continue to your account
      </TextTag>

      {formStatus ? (
        <TextTag
          as="p"
          className={cn(
            "text-left text-[0.9rem]",
            formStatus.status === 2000 ? "text-app_text_blue" : "text-app_error"
          )}
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
        variant="blued"
        className={cn(
          "w-full p-[7px_0]",
          loading ? "cursor-not-allowed" : "cursor-pointer"
        )}
        disabled={loading}
      >
        {loading ? "loading..." : "Sign In"}
      </Button>

      <FormOrSeparator />

      <Button
        className="w-full p-[7px_0]"
        type="button"
        variant="light"
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

      <TextTag className="mx-auto my-[10px] self-center text-app_text_grayed sm:self-auto">
        Don&apos;t have an account?
        <Link href="/signup">
          <TextTag className="cursor-pointer text-app_text_blue">
            Create One
          </TextTag>
        </Link>
      </TextTag>
    </FormWrapper>
  );
}
