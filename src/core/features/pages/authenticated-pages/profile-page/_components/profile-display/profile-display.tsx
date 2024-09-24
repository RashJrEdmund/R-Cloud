"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";
import { useEffect, useMemo } from "react";
import StyledProfileDisplay from "./styled-profile-display";
import { ProfileImage } from "..";
import { useRouter } from "next/navigation";
import { UsedSpaceDisplay } from "@/components/molecules";

interface Props {
  //
}

export default function ProfileDisplay({}: Props) {
  const {
    currentUser,
    currentUserLoading,

    userProfile,
    userProfileLoading,

    setLogOutDialogOpen,
  } = useUserStore();
  const router = useRouter();

  const LastLogin = useMemo(
    () => new Date(currentUser?.metadata?.lastSignInTime as any).toDateString(),
    [currentUser]
  );

  useEffect(() => {
    if (!currentUser && !userProfile) router.push("/r-drive");
  }, [currentUser, router, userProfile]);

  // console.log('user bytes', userProfile && calculatePercentage(userProfile?.plan.used_bytes, userProfile?.plan.bytes));

  return (
    <StyledProfileDisplay>
      <DivCard className="flex-col items-start gap-4 sm:flex-row">
        <ProfileImage />

        <DivCard className="flex-col items-start gap-4">
          <DivCard className="w-full flex-wrap justify-start gap-4">
            {!currentUserLoading ? (
              <>
                <div className="flex flex-col">
                  <TextTag className="whitespace-nowrap text-[0.9rem]">
                    Logged In as:
                  </TextTag>

                  <TextTag className="text-app_text_blue">
                    {currentUser?.username}
                  </TextTag>
                </div>

                <div className="flex flex-col">
                  <TextTag className="whitespace-nowrap text-[0.9rem]">
                    Current Plan
                  </TextTag>
                  <TextTag className="text-app_text_blue">
                    {userProfile?.plan.label || "---"}
                  </TextTag>
                </div>

                <div className="flex flex-col gap-[7px]">
                  <TextTag className="whitespace-nowrap text-[0.9rem]">
                    Plan Capacity
                  </TextTag>

                  <DivCard className="flex-wrap justify-start">
                    <TextTag className="whitespace-nowrap text-app_text_blue">
                      {userProfile?.plan.capacity} at
                    </TextTag>

                    <TextTag className="whitespace-nowrap text-app_text_blue">
                      {userProfile?.plan.rate}(
                      {userProfile?.plan.is_free ? "Free" : "Paid"} Tier)
                    </TextTag>
                  </DivCard>
                </div>
              </>
            ) : (
              <TextTag className="whitespace-nowrap">
                getting profile...
              </TextTag>
            )}
          </DivCard>

          <UsedSpaceDisplay />

          <DivCard className="w-full flex-col items-start justify-start">
            <TextTag className="text-[0.9rem]">
              username
              <TextTag className="text-app_text_blue">
                {currentUser?.username}
              </TextTag>
            </TextTag>

            <TextTag className="text-[0.9rem]">
              email
              <TextTag className="text-app_text_blue">
                {currentUser?.email}
              </TextTag>
            </TextTag>

            <TextTag className="text-[0.9rem]">
              Phone Number
              <TextTag className="text-app_text_blue">
                {currentUser?.phone_number || "None Provided"}
              </TextTag>
            </TextTag>

            <TextTag className="text-[0.9rem]">
              Last Log in
              <TextTag className="text-app_text_blue">{LastLogin}</TextTag>
            </TextTag>
          </DivCard>
        </DivCard>
      </DivCard>

      <DivCard className="w-full items-start justify-start">
        <Button
          variant="error"
          className="min-w-[320px] cursor-pointer"
          onClick={() => setLogOutDialogOpen(true)}
        >
          Log out
        </Button>
      </DivCard>
    </StyledProfileDisplay>
  );
}
