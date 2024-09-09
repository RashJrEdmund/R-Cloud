import { DivCard, MainTag, TextTag } from "@/components/atoms";
import { Recordings } from "./_components";
import { TopSection } from "@/components/molecules";

interface Props {}

export default function VideoGuidesPage({}: Props) {
  return (
    <MainTag className="justify-start gap-0">
      <TopSection hide_search_section />

      <DivCard className="mb-4 w-primary_app_w flex-col gap-8">
        <TextTag className="w-full max-w-[400px] text-center text-app_text_grayed">
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
