"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";
import Image from "next/image";

import type { StoragePlan } from "@/core/interfaces/entities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PlanBadge } from "./plan-badge";
import { cn } from "@/core/lib/utils";
import { useMemo } from "react";

interface Props {
  plan: StoragePlan;
}

export default function StoragePlan({ plan }: Props) {
  const { currentUser, userProfile } = useUserStore();
  const router = useRouter();

  const isCurrentPlan = useMemo(() => {
    return !!(
      currentUser &&
      userProfile &&
      userProfile.plan.plan_id === plan.id
    );
  }, [currentUser, userProfile, plan]);

  // console.log({ currentUser, userProfile });

  const handleNewSubscription = (plan: StoragePlan) => {
    if (!currentUser) {
      router.push("/login?next=" + window.location);
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
    <DivCard
      className={cn(
        "relative mx-auto w-[min(100%,_85vw)] max-w-[420px] flex-col gap-4 overflow-hidden rounded-[5px] bg-app_white px-6 pb-12 pt-8 shadow transition-shadow duration-300 hover:shadow-md sm:gap-6 mdxl:gap-12",
        plan.is_free || isCurrentPlan
          ? "shadow-black hover:shadow-black"
          : "shadow-app_blue hover:shadow-app_blue"
      )}
    >
      <PlanBadge plan={plan} />

      <TextTag className="text-[1.5rem] font-semibold text-app_text_blue md:text-[1.75rem]">
        {plan.label}
      </TextTag>

      <Image
        src={plan.icon_url}
        alt={plan.label + " icon"}
        title={plan.label}
        width={300}
        height={300}
        className="size-[200px] ssm:size-[250px] lg:size-[300px]"
      />

      <DivCard className="w-full flex-col gap-[10px]">
        <TextTag className="text-[2rem] font-semibold">{plan.capacity}</TextTag>

        <TextTag className="text-[0.9rem]">{plan.rate}</TextTag>
      </DivCard>

      {isCurrentPlan ? (
        <Button
          variant={plan.is_free ? "black" : "blued"}
          className="w-full p-[10px] sm:p-5 md:p-6 mdxl:p-7 mdxl:text-[1.2rem]"
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
          className="w-full p-[10px] sm:p-5 md:p-6 mdxl:p-7 mdxl:text-[1.2rem]"
          title={"subscribe to plan: " + plan.label}
          onClick={() => handleNewSubscription(plan)}
        >
          {plan.is_free ? "Free Plan" : "Buy Plan"}
        </Button>
      )}
    </DivCard>
  );
}
