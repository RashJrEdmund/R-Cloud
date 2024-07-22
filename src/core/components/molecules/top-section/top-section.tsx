import { DivCard } from "@/components/atoms";
import TopSectionHolder from "./top-section-holder";
import { Navigator, Search, DisplayLayout, MoreSection } from "./_components";

interface Props {
  hide_search_section?: boolean;
}

export default function TopSection({ hide_search_section = false }: Props) {
  return (
    <TopSectionHolder>
      <Navigator />

      {hide_search_section ? null : (
        <DivCard className="gap-4">
          <Search />

          <DisplayLayout />

          <MoreSection />
        </DivCard>
      )}
    </TopSectionHolder>
  );
}
