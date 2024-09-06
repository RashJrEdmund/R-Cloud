"use client";

import { DivCard, TextTag } from "@/components/atoms";
import { useUserStore } from "@/providers/stores/zustand";
import Image from "next/image";

import type { StoragePlan } from "@/core/interfaces/entities";
import { PlanBadge } from "./plan-badge";
import { PlanButton } from "./plan-button";
import { cn } from "@/core/lib/utils";
import { useMemo } from "react";

interface Props {
  plan: StoragePlan;

  /**
   * to know weather or not to allow editing as if in dashboard.
  */
  isInDashboard?: boolean;
}

export default function PlanCard({ plan, isInDashboard }: Props) {
  const { currentUser, userProfile } = useUserStore();

  const isCurrentPlan = useMemo(() => {
    return !!(
      currentUser &&
      userProfile &&
      userProfile.plan.plan_id === plan.id
    );
  }, [currentUser, userProfile, plan]);

  // console.log({ currentUser, userProfile });

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

      <PlanButton
        isInDashboard={!!isInDashboard}
        isCurrentPlan={isCurrentPlan}
        plan={plan}
      />
    </DivCard>
  );
};
