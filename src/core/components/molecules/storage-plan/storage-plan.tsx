"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";
import Image from "next/image";

import type { StoragePlan } from "@/core/interfaces/entities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  plan: StoragePlan;
}

export default function StoragePlan({ plan }: Props) {
  const { currentUser, userProfile } = useUserStore();
  const router = useRouter();

  // console.log({ currentUser, userProfile });

  const handleNewSubscription = (plan: StoragePlan) => {
    if (!currentUser) {
      router.push("/login");
      toast.info("You need to be logged in first", {
        duration: 10_000,
      });
      return;
    }

    toast("This feature is still in progress", {
      description: "Would you like to be added to wait list",
      closeButton: true,
      duration: 5000,
      action: {
        label: "Add me",
        onClick: () => {
          toast.promise(
            new Promise((res) =>
              setTimeout(
                () => res("🙂 This feature is also not yet available"),
                1000
              )
            ) as Promise<string>,
            {
              loading: "Processing...",
              success: (res) => res,
              error: "failed",
            }
          );
        },
      },
    });
  };

  return (
    <DivCard className="relative mx-auto w-[min(100%,_85vw)] flex-col gap-4 rounded-[5px] border border-app_border bg-app_white px-6 pb-12 pt-8 duration-300 hover:shadow">
      {plan.is_free ? (
        <TextTag className="absolute left-0 top-0 m-[15px] text-[0.9rem]">
          free
        </TextTag>
      ) : null}

      <TextTag className="text-[1.5rem] font-semibold text-app_text_blue md:text-[1.75rem]">
        {plan.label}
      </TextTag>

      <Image
        src={plan.icon_url}
        alt={plan.label + " icon"}
        title={plan.label}
        width={200}
        height={200}
      />

      <DivCard className="w-full flex-col gap-[10px]">
        <TextTag className="text-[2rem] font-semibold">{plan.capacity}</TextTag>

        <TextTag className="text-[0.9rem]">{plan.rate}</TextTag>
      </DivCard>

      {currentUser && userProfile && userProfile.plan.id === plan.id ? (
        <Button
          variant={plan.is_free ? "black" : "blued"}
          className="w-full p-[10px]"
          title={"subscribe to plan: " + plan.label}
          onClick={() => {
            toast.warning("Already subscribed to this plan");
          }}
        >
          Current Plan
        </Button>
      ) : (
        <Button
          variant={plan.is_free ? "black" : "blued"}
          className="w-full p-[10px] duration-300 hover:bg-app_orange"
          title={"subscribe to plan: " + plan.label}
          onClick={() => handleNewSubscription(plan)}
        >
          {plan.is_free ? "Free Plan" : "Buy Plan"}
        </Button>
      )}
    </DivCard>
  );
}
