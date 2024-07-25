import type { StoragePlan } from "@/core/interfaces/entities";

import { TextTag } from "@/components/atoms";
import { BadgeCheck, Crown } from "lucide-react";
import { cn } from "@/core/lib/utils";

interface PlanBadgeTextProps {
  className?: string;
  children: React.ReactNode;
}

interface PlanBadgeProps {
  className?: string;
  plan: StoragePlan;
}

function PlanBadgeText({ className, children }: PlanBadgeTextProps) {
  return (
    <TextTag
      className={cn(
        "absolute left-[-45%] top-0 m-[15px] w-full rotate-[-45deg] text-[0.9rem] text-app_text_white",
        className
      )}
    >
      {children}
    </TextTag>
  );
}

function PlanBadge({ className, plan }: PlanBadgeProps) {
  if (plan.is_free)
    return (
      <PlanBadgeText className={cn("bg-app_black", className)}>
        <BadgeCheck size={20} />
        free
      </PlanBadgeText>
    );

  const getPlanBadgeColor = (id?: string) => {
    if (id === "3") return "bg-yellow-300";
    if (id === "4") return "bg-app_orange";
    if (id === "5") return "bg-orange-500";
    return false;
  };

  if (getPlanBadgeColor(plan.id))
    return (
      <PlanBadgeText className={cn(getPlanBadgeColor(plan.id), className)}>
        <Crown size={20} />
      </PlanBadgeText>
    );

  return null;
}

export { PlanBadge };
