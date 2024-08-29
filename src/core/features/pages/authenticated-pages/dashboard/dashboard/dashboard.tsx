import { DivCard, TextTag } from "@/components/atoms";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <DivCard className="w-full h-auto flex-col justify-start items-start">
      <TextTag as="h2" className="mx-auto text-xl">base dashboard page</TextTag>

      <DivCard className="w-full h-auto size-full gap-3">
        <Skeleton
          className="size-full max-w-[400px] max-h-[400px]"
        />

        <Skeleton
          className="size-full max-w-[400px] max-h-[400px]"
        />

        <Skeleton
          className="size-full max-w-[400px] max-h-[400px]"
        />
      </DivCard>
    </DivCard>
  );
}
