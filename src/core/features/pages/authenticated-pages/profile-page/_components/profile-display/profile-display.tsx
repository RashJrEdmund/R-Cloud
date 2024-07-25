"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";
import { useEffect, useMemo, useState } from "react";
import StyledProfileDisplay from "./styled-profile-display";
import { ProfileImage } from "..";
import { useRouter } from "next/navigation";
import { logOut } from "@/core/config/firebase";
import { getUserProfile } from "@/core/config/firebase/fire-store";
import { UsedSpaceDisplay } from "@/components/molecules";
import { cn } from "@/core/lib/utils";

interface Props {
  //
}

export default function ProfileDisplay({}: Props) {
  const { currentUser, setCurrentUser, userProfile, setUserProfile } =
    useUserStore();

  const [logOutState, setLogOutState] = useState<{
    isLoading: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const LastLogin = useMemo(
    () => new Date(currentUser?.metadata?.lastSignInTime as any).toDateString(),
    [currentUser]
  );

  const handleLogOut = () => {
    setLogOutState({
      isLoading: true,
      message: "Login out",
    });

    logOut()
      .then(() => {
        setCurrentUser(null);
        router.replace("/");
      })
      .finally(() => {
        setLogOutState(null);
      });
  };

  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser) return;
    if (!currentUser) return;
    if (!currentUser) return;
    getUserProfile(currentUser.email)
      .then((res) => {
        if (!res.exists()) return;

        const profile = res.data();
        setUserProfile(profile);
      })
      .catch(() => router.push("/r-drive"))
      .finally(() => setLoading(false));
  }, []);

  // console.log('user bytes', userProfile && calculatePercentage(userProfile?.plan.used_bytes, userProfile?.plan.bytes));

  return (
    <StyledProfileDisplay>
      <DivCard className="flex-col items-start gap-4 sm:flex-row">
        <ProfileImage />

        <DivCard className="flex-col items-start gap-4">
          <DivCard className="w-full flex-wrap justify-start gap-4">
            {!loading || currentUser ? (
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

          {/* <pre>
  {JSON.stringify(userProfile, null, 4)}
</pre> */}

          <UsedSpaceDisplay userProfile={userProfile} />

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
          className={cn(
            "min-w-[320px]",
            loading ? "cursor-not-allowed" : "cursor-pointer"
          )}
          disabled={logOutState?.isLoading}
          onClick={handleLogOut}
        >
          {logOutState?.isLoading ? logOutState?.message : "Log out"}
        </Button>
      </DivCard>
    </StyledProfileDisplay>
  );
}
