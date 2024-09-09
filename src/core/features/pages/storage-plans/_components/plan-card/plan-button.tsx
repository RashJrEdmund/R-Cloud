"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/providers/stores/zustand";

import type { StoragePlan } from "@/core/interfaces/entities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DivCard } from "@/components/atoms";

interface Props {
  isInDashboard: boolean;
  isCurrentPlan: boolean;
  plan: StoragePlan;
}

function PlanButton({ isInDashboard, isCurrentPlan, plan }: Props) {
  const { currentUser } = useUserStore();
  const router = useRouter();

  if (isInDashboard)
    return (
      <DivCard className="w-full rounded-md bg-app_bg_grayed p-[10px] sm:p-5 md:p-6 mdxl:p-7 mdxl:text-[1.2rem]" />
    );

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

  return isCurrentPlan ? (
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
  );
}

export { PlanButton };
