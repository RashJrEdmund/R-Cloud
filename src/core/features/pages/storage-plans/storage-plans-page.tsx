import { MainTag } from "@/components/atoms";
import { TopSection } from "@/components/molecules";
import PlanDisplay from "./_components/plan-display";

interface Props {}

export default function StoragePlansPage({}: Props) {
  return (
    <MainTag>
      <TopSection hide_search_section />

      <PlanDisplay />
    </MainTag>
  );
}
