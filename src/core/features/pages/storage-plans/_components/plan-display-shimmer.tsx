import { Skeleton } from "@/components/ui/skeleton";
import StyledStoragePlanDisplay from "../../../dummy-data/styled-storage-plan-display";
import { DivCard } from "@/components/atoms";

export default function PlanDisplayShimmer() {
  return (
    <StyledStoragePlanDisplay>
      {Array.from({ length: 6 }, (_, i) => i).map((indx) => (
        <Skeleton key={indx} className="mx-auto flex w-[min(100%,_85vw)] flex-col items-center gap-4 rounded-[5px] bg-app_white px-6 pb-12 pt-8 shadow">
          <Skeleton className="h-[2rem] w-[140px] text-app_text_blue md:h-[2.5rem]" />

          <Skeleton className="h-[200px] w-[200px]" />

          <DivCard className="w-full flex-col gap-[10px]">
            <Skeleton className="h-[2.6rem] w-[140px]" />

            <Skeleton className="h-[1.5rem] w-[160px]" />
          </DivCard>

          <Skeleton className="h-[3rem] w-full" />
        </Skeleton>
      ))}
    </StyledStoragePlanDisplay>
  );
}
