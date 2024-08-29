import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Recordings } from "./_components";
import { TopSection } from "@/components/molecules";

interface Props { };

export default function VideoGuidesPage({ }: Props) {
  return (
    <MainTag className="gap-0 justify-start">
      <TopSection hide_search_section />

      <DivCard className="flex-col gap-8 mb-4">
        <TextTag className="text-app_text_grayed text-center max-w-[400px]">
          Video guides on how to use my cloud storage provider
        </TextTag>

        <TextTag as="h2" className="text-2xl font-semibold underline">
          How To ?
        </TextTag>
      </DivCard>

      <Recordings />
    </MainTag>
  );
}
