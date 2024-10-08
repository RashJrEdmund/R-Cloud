import { DivCard } from "@/components/atoms";
import {
  Navigator,
  Refetch,
  SelectAll,
  Search,
  ColumnLayout,
  Sort,
  DisplayLayout,
  MoreSection,
} from "./components";

interface Props {
  hide_search_section?: boolean;
}

export default function TopSection({ hide_search_section = false }: Props) {
  return (
    <DivCard className="mx-auto mb-4 h-fit w-primary_app_w justify-between p-[10px]">
      <DivCard className="gap-2 sm:gap-8">
        <Navigator />

        {hide_search_section ? null : (
          <>
            <SelectAll />

            <Refetch />
          </>
        )}
      </DivCard>

      {hide_search_section ? null : (
        <DivCard className="gap-2 md:gap-4">
          <Search />

          <Sort />

          <ColumnLayout />

          <DisplayLayout />

          <MoreSection />
        </DivCard>
      )}
    </DivCard>
  );
}
