"use client";

import { FormWrapper, FormOrSeparator } from "../../components";
import { InputField } from "@/components/molecules";
import { TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validateCreateAccountForm } from "../../services/form-validations";
import {
  signInOrUpWithGooglePopup,
  signUpWithCredentials,
} from "@/core/config/firebase";
import { useRouter } from "next/navigation";
import { handleCreateUserProfile } from "../../auth-helpers";

import type { MouseEventHandler } from "react";
import type { FieldErrors } from "../../services/form-validations/form-interfaces";
import { cn } from "@/core/lib/utils";
import { extractUserDetailsFromFirebaseAuth } from "@/providers/guards/app-wrapper/app-wrapper.service";
import { useUserStore } from "@/providers/stores/zustand";

interface Props {
  //
}

export default function SignUpForm({ }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FieldErrors | null>(null);
  const [formStatus, setFormStatus] = useState<{
    status: number;
    message: string;
  } | null>(null);

  const { setCurrentUser } = useUserStore();
  const router = useRouter();

  const handleGoogleSignUp: MouseEventHandler<HTMLButtonElement> = () => {
    signInOrUpWithGooglePopup().then(async (res) => {
      await handleCreateUserProfile(res?.user, null, {
        setFormStatus,
      });

      const _user = await extractUserDetailsFromFirebaseAuth(res!.user);

      setCurrentUser(_user);

      router.push("/r-drive");
    });
  };

  const signUpFormAction = (formData: FormData) => {
    setLoading(true);
    setErrors(null);
    setFormStatus({ status: 200, message: "Creating account..." });

    const rawData = Object.fromEntries(formData.entries());
    rawData.date_of_birth = new Date(
      (rawData?.date_of_birth as any) || ""
    ) as any; // ensuring date is in date format

    const validation = validateCreateAccountForm(
      rawData as { [key: string]: string }
    );

    if (validation.errors) {
      setFormStatus({ status: 401, message: validation.message || "" });
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // API CALL.
    signUpWithCredentials(
      validation.data?.email || "",
      validation.data?.password || "",
      validation.data as any
    )
      .then(async (user) => {
        await handleCreateUserProfile(
          user,
          validation?.data as { [key: string]: string },
          { setFormStatus }
        );

        const _user = await extractUserDetailsFromFirebaseAuth(user!);

        setCurrentUser(_user);

        router.push("/r-drive");
      })
      .catch((er) => {
        setFormStatus({
          status: 401,
          message: "Could not create account. Try again or use another method",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormWrapper img_url="signup-img.svg" formAction={signUpFormAction}>
      <TextTag as="h1" className="text-[2rem] font-semibold">
        Create Account
      </TextTag>

      <TextTag as="p" className="text-left text-app_text_grayed">
        Create an account to get started
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
        field_title="Your Name"
        field_name="username"
        error={errors?.username}
      />

      <InputField
        field_title="Date of Birth"
        field_name="date_of_birth"
        error={errors?.date_of_birth as string}
        type="date"
        leave_active
      />

      <InputField
        field_title="Email"
        field_name="email"
        error={errors?.email}
      />

      <InputField
        field_title="Password"
        field_name="password"
        error={errors?.password}
      />

      <InputField
        field_title="Confirm password"
        field_name="confirm_password"
        error={errors?.confirm_password}
      />

      <Button
        className={cn(
          "w-full p-[7px_0]",
          loading ? "cursor-not-allowed" : "cursor-pointer"
        )}
        type="submit"
        variant="blued"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign Up"}
      </Button>

      <FormOrSeparator />

      <Button
        type="button"
        variant="light"
        className={cn("w-full p-[7px_0]")}
        onClick={handleGoogleSignUp}
      >
        Continue in with Google
        <Image
          src="/icons/google-icon.svg"
          alt="google icon"
          height={25}
          width={25}
        />
      </Button>

      <TextTag className="mx-auto my-[10px] self-center text-app_text_grayed sm:self-auto">
        Already have an account ??
        <Link href="/login">
          <TextTag className="cursor-pointer text-app_text_blue">
            Sign In
          </TextTag>
        </Link>
      </TextTag>
    </FormWrapper>
  );
}
