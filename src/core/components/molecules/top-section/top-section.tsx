import { DivCard } from "@/components/atoms";
import { Navigator, Search, DisplayLayout, MoreSection } from "./_components";

interface Props {
  hide_search_section?: boolean;
}

export default function TopSection({ hide_search_section = false }: Props) {
  return (
    <DivCard className="mx-auto my-4 h-fit w-primary_app_width justify-between p-[10px]">
      <Navigator />

      {hide_search_section ? null : (
        <DivCard className="gap-4">
          <Search />

          <DisplayLayout />

          <MoreSection />
        </DivCard>
      )}
    </DivCard>
  );
}
