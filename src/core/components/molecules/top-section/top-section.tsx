import { DivCard } from "@/components/atoms";
import { Navigator, SelectAll, Search, DisplayLayout, MoreSection, Sort } from "./_components";

interface Props {
  hide_search_section?: boolean;
}

export default function TopSection({ hide_search_section = false }: Props) {
  return (
    <DivCard className="mx-auto mb-4 h-fit w-primary_app_width justify-between p-[10px]">
      <DivCard className="gap-4 sm:gap-8">
        <Navigator />

        {
          hide_search_section ? null : <SelectAll />
        }
      </DivCard>

      {hide_search_section ? null : (
        <DivCard className="gap-4">
          <Search />

          <Sort />

          <DisplayLayout />

          <MoreSection />
        </DivCard>
      )}
    </DivCard>
  );
}
