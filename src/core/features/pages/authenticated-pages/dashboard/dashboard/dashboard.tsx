import { DivCard, TextTag } from "@/components/atoms";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <DivCard className="h-auto w-full flex-col items-start justify-start">
      <TextTag as="h2" className="mx-auto text-xl">
        base dashboard page
      </TextTag>

      <DivCard className="size-full h-auto w-full gap-3">
        <Skeleton className="size-full max-h-[400px] max-w-[400px]" />

        <Skeleton className="size-full max-h-[400px] max-w-[400px]" />

        <Skeleton className="size-full max-h-[400px] max-w-[400px]" />
      </DivCard>
    </DivCard>
  );
}
