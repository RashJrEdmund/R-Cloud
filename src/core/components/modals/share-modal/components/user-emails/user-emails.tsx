"use client";

import type { FormEventHandler } from "react";

import { useEffect, useState } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import { InputField } from "@/components/molecules";
import { useShareModalStore, useUserStore } from "@/providers/stores/zustand";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";
import { z } from "zod";
import { getUserProfile } from "@/core/config/firebase/fire-store";

interface Props {
  //
}

export default function UserEmailS({ }: Props) {
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<Record<"error" | "success", string | null>>({
    error: null,
    success: null
  });

  const { currentUser } = useUserStore();

  const {
    isSharing,
    searching, setSearching,
    userEmails,
    setUserEmails,
  } = useShareModalStore();

  const removeEmail = (email: string) => {
    const prev = [...userEmails];
    setUserEmails(prev.filter((eml) => eml !== email));
  };

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (!email) {
      setMsg({ error: "search and add recipient emails", success: null });
      return;
    };

    if (isSharing || searching || !!msg.error) return;

    setUserEmails([email, ...userEmails]);

    setEmail("");
    setMsg({ error: null, success: null });
  };

  const handleSearch = async () => {
    if (!email) {
      setMsg({ error: null, success: null });
      return;
    };

    const { success, data } = z.string().email().safeParse(email);

    if (!success) {
      setMsg({ error: "invalid email", success: null });
      return;
    };

    setSearching(true);

    getUserProfile(data)
      .then((res) => {
        if (!res.exists()) {
          throw new Error("email not found! invalid r-cloud account");
        }

        if (userEmails.includes(res.data().email)) {
          throw new Error("email has already been added");
        }

        if (currentUser!.email === res.data().email) {
          throw new Error("really man?? 🙄");
        }

        setMsg({ error: null, success: "add email" });
      })
      .catch((error) => setMsg({ error: error?.message, success: null }))
      .finally(() => setSearching(false));
  };

  useEffect(() => {
    const timeId = setTimeout(handleSearch, 500);

    return () => {
      clearTimeout(timeId);
    };
  }, [email]);

  return (
    <>
      <DivCard
        as="form"
        className="w-full items-center justify-start gap-2"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="search-email" className="w-full">
          <InputField
            leave_active
            id="search-email"
            placeholder="recipient email. must be an existing r-cloud user"
            field_title="Add exact match of recipient email"
            field_name="add-users-name"
            value={email}
            onValueChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            error={msg.error}
            success={msg.success}
            isLoading={searching}
            disabled={isSharing}
          />
        </label>

        <Button
          type="submit"
          className="w-fit cursor-pointer p-3"
          title="add user"
          disabled={isSharing || searching || !!msg.error}
        >
          <UserPlus className="w-full" />
        </Button>
      </DivCard>

      <DivCard className="h-fit max-h-[200px] min-h-[100px] w-full flex-col justify-start gap-2 overflow-y-auto rounded-sm border border-app_bg_light px-1 py-2 sm:py-3 md:max-h-[300px]">
        {userEmails.length ? (
          userEmails?.map((email) => (
            <DivCard
              key={email}
              className="w-full justify-between rounded-sm border border-app_bg_light bg-app_bg p-2 shadow"
            >
              <TextTag className="text-app_text_grayed">{email}</TextTag>

              <X
                size={20}
                className="cursor-pointer text-app_error"
                onClick={() => removeEmail(email)}
              />
            </DivCard>
          ))
        ) : (
          <TextTag className="text-center text-app_text_grayed">
            search and add users to grant access
          </TextTag>
        )}
      </DivCard>
    </>
  );
}
