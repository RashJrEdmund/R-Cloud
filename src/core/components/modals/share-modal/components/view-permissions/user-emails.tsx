"use client";

import type { FormEventHandler } from "react";

import { useState } from "react";
import { DivCard, TextTag } from "@/components/atoms";
import { InputField } from "@/components/molecules";
import { useShareModalStore } from "@/providers/stores/zustand";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";

interface Props {
  isSharing: boolean;
  handleShareFile: () => Promise<void>;
}

export default function UserEmailS({ isSharing, handleShareFile }: Props) {
  const [email, setEmail] = useState<string>();
  const [searching, setSearching] = useState<boolean>(false);

  const {
    userEmails,
    setUserEmails,
  } = useShareModalStore();

  const removeEmail = (email: string) => {
    const prev = [...userEmails];
    setUserEmails(prev.filter((eml) => eml !== email));
  };

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    handleShareFile();
  };

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
            placeholder="recipient email"
            field_title="add users"
            field_name="add-users-name"
            value={email}
            onValueChange={(e) => setEmail(e.target.value)}
            error={null}
            disabled={isSharing}
          />
        </label>

        <Button
          type="submit"
          className="w-fit cursor-pointer p-3"
          title="add user"
          disabled={isSharing}
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
                className="cursor-pointer hover:text-app_error"
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
