import { DivCard } from "@/components/atoms";
import { Navigator, Search, DisplayLayout, MoreSection } from "./_components";

interface Props {
  hide_search_section?: boolean;
}

export default function TopSection({ hide_search_section = false }: Props) {
  return (
    <DivCard className="w-primary_app_width h-fit justify-between px-0 py-[10px] mx-auto my-4">
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
};
